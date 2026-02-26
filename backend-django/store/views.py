# from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem,Coupon
from .models import WishlistItem
from rest_framework.authtoken.models import Token
from .serializers import ProductSerializer, RegisterSerializer, OrderSerializer, UserSerializer, WishlistItemSerializer
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
        user = serializer.save()
        
        # Link guest orders to newly created user
        Order.objects.filter(email=user.email, user=None).update(user=user)
        
        # Link guest wishlist items to newly created user
        WishlistItem.objects.filter(email=user.email, user=None).update(user=user, email='')
        
        return Response({'message': 'User created'}, status=201)
    return Response(serializer.errors, status=400)


def create(self, validated_data):
    validated_data['username'] = validated_data['email']
    return User.objects.create_user(**validated_data)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {"error": "Email and password required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    user = authenticate(username=user_obj.username, password=password)

    if user is None:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        "key": token.key,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):

    user = request.user

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


@api_view(['GET'])
def get_orders(request):
    email = request.query_params.get('email')
    
    if not email:
        return Response({'error': 'Email parameter required'}, status=400)
    
    try:
        user = User.objects.get(email=email)
        # Get orders linked to user
        orders = Order.objects.filter(user=user).prefetch_related('items__product')
    except User.DoesNotExist:
        # No registered user, check for guest orders with this email
        orders = Order.objects.filter(email=email, user=None).prefetch_related('items__product')
    
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def get_wishlist(request):
    email = request.query_params.get('email')
    if not email:
        return Response({'error': 'Email parameter required'}, status=400)

    try:
        user = User.objects.get(email=email)
        # Get wishlist items for registered user
        items = WishlistItem.objects.filter(user=user).select_related('product')
    except User.DoesNotExist:
        # Get wishlist items for guest user
        items = WishlistItem.objects.filter(email=email, user=None).select_related('product')
    
    products = [w.product for w in items]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def toggle_wishlist(request):
    email = request.data.get('email')
    product_id = request.data.get('product_id')

    if not email or not product_id:
        return Response({'error': 'email and product_id required'}, status=400)

    # Check if user is authenticated
    user = None
    if request.user.is_authenticated:
        user = request.user
        email = request.user.email
    
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    if user:
        # For authenticated users
        obj, created = WishlistItem.objects.get_or_create(user=user, product=product, email='')
    else:
        # For guest users
        obj, created = WishlistItem.objects.get_or_create(user=None, product=product, email=email)
    
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

        # For guest checkout, don't create a user account
        # Only create an order with email stored in the email field
        user = None

        # If user is authenticated, link order to authenticated user
        if request.user.is_authenticated:
            user = request.user
            email = request.user.email
        
        # Create order
        order = Order.objects.create(
            user=user,
            email=email,
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
    
@api_view(['POST'])
def validate_coupon(request):
    code = request.data.get('code')

    if not code:
        return Response({"error": "Coupon code required"}, status=400)

    try:
        coupon = Coupon.objects.get(code__iexact=code, active=True)
        return Response({
            "valid": True,
            "discount_percent": coupon.discount_percent
        })
    except Coupon.DoesNotExist:
        return Response({
            "valid": False,
            "error": "Invalid or expired coupon"
        }, status=400)