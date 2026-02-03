from django.urls import path
from .views import products, register, login, create_order, get_orders, get_wishlist, toggle_wishlist


urlpatterns = [
    path('products/', products),
    path('register/', register),
    path('login/', login),
    path('orders/', get_orders),
    path('orders/create/', create_order),
    path('wishlist/', get_wishlist),
    path('wishlist/toggle/', toggle_wishlist),
]