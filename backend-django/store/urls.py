from django.urls import path
from .views import products,product_detail, register, login, create_order, get_orders, get_wishlist, toggle_wishlist, get_user_profile, create_admin_user


urlpatterns = [
    path('products/', products),
    path('products/<int:id>/', product_detail),  # ADD THIS
    path('register/', register),
    path('login/', login),
    path('user/profile/', get_user_profile),
    path('orders/', get_orders),
    path('orders/create/', create_order),
    path('wishlist/', get_wishlist),
    path('wishlist/toggle/', toggle_wishlist),
    path('create-admin/', create_admin_user),
]