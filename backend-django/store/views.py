# from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem
from .models import WishlistItem
from .serializers import ProductSerializer, RegisterSerializer, OrderSerializer, WishlistItemSerializer
import logging

logger = logging.getLogger(__name__)


@api_view(['GET'])
def products(request):
    try:
        products = Product.objects.all()
        logger.info(f"Fetched {products.count()} products")
        serializer = ProductSerializer(products, many=True)
        logger.info(f"Serialized data: {serializer.data}")
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error fetching products: {str(e)}")
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def product_detail(request, id):
    try:
        product = Product.objects.get(id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)



@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User created'}, status=201)
    return Response(serializer.errors, status=400)




@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user:
        return Response({'message': 'Login successful', 'user_id': user.id, 'email': user.email})
    return Response({'error': 'Invalid credentials'}, status=401)


@api_view(['GET'])
def get_user_profile(request):
    email = request.query_params.get('email')
    
    if not email:
        return Response({'error': 'Email parameter required'}, status=400)
    
    try:
        user = User.objects.get(email=email)
        # Try to get the most recent order to get delivery details
        last_order = Order.objects.filter(user=user).order_by('-created_at').first()
        
        profile_data = {
            'email': user.email,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'address': last_order.address if last_order else '',
            'city': last_order.city if last_order else '',
            'phone': last_order.phone if last_order else '',
        }
        return Response(profile_data)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)


@api_view(['GET'])
def get_orders(request):
    email = request.query_params.get('email')
    
    if not email:
        return Response({'error': 'Email parameter required'}, status=400)
    
    try:
        user = User.objects.get(email=email)
        orders = Order.objects.filter(user=user).prefetch_related('items__product')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response([])


@api_view(['GET'])
def get_wishlist(request):
    email = request.query_params.get('email')
    if not email:
        return Response({'error': 'Email parameter required'}, status=400)

    try:
        user = User.objects.get(email=email)
        items = WishlistItem.objects.filter(user=user).select_related('product')
        products = [w.product for w in items]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response([])


@api_view(['POST'])
def toggle_wishlist(request):
    email = request.data.get('email')
    product_id = request.data.get('product_id')

    if not email or not product_id:
        return Response({'error': 'email and product_id required'}, status=400)

    user, _ = User.objects.get_or_create(username=email, defaults={'email': email})
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    obj, created = WishlistItem.objects.get_or_create(user=user, product=product)
    if not created:
        obj.delete()
        return Response({'message': 'removed'})
    return Response({'message': 'added'})


@api_view(['POST'])
def create_order(request):
    try:
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        address = request.data.get('address')
        city = request.data.get('city')
        phone = request.data.get('phone')
        total_price = request.data.get('total_price')
        items = request.data.get('items', [])

        # Get or create user
        user, created = User.objects.get_or_create(
            username=email,
            defaults={
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
            }
        )

        # Create order
        order = Order.objects.create(
            user=user,
            total_price=total_price,
            address=address,
            city=city,
            phone=phone,
        )

        # Create order items
        for item in items:
            product = Product.objects.get(id=item.get('product_id'))
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item.get('quantity'),
            )

        return Response({
            'message': 'Order created successfully',
            'order_id': order.id,
        }, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
def create_admin_user(request):
    """
    Create a superuser via API (for Render deployment without shell access)
    POST /api/create-admin/
    Body: {
        "username": "admin",
        "email": "admin@giftology.com",
        "password": "your-strong-password"
    }
    """
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not all([username, email, password]):
        return Response(
            {'error': 'username, email, and password are required'}, 
            status=400
        )
    
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': f'User with username "{username}" already exists'}, 
            status=400
        )
    
    try:
        admin = User.objects.create_superuser(
            username=username,
            email=email,
            password=password
        )
        return Response({
            'message': 'Superuser created successfully!',
            'username': admin.username,
            'email': admin.email,
            'is_staff': admin.is_staff,
            'is_superuser': admin.is_superuser,
        }, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)