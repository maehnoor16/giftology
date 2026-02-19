
# Register your models here.
from django.contrib import admin
from .models import Product, Order, OrderItem,Coupon


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ('product', 'quantity', 'get_price')
    readonly_fields = ('get_price',)
    
    def get_price(self, obj):
        return f"Rs.{obj.product.price * obj.quantity}"
    get_price.short_description = 'Total Price'


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_email', 'get_user_name', 'total_price', 'item_count', 'created_at')
    list_filter = ('created_at', 'user')
    search_fields = ('user__email', 'user__first_name', 'user__last_name')
    readonly_fields = ('created_at', 'total_price', 'item_count', 'user_details')
    inlines = [OrderItemInline]
    
    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'Email'
    
    def get_user_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    get_user_name.short_description = 'Customer Name'
    
    def item_count(self, obj):
        return obj.items.count()
    item_count.short_description = 'No. of Items'
    
    def user_details(self, obj):
        return f"Name: {obj.user.first_name} {obj.user.last_name}\nEmail: {obj.user.email}\nPhone: {obj.phone}\nAddress: {obj.address}\nCity: {obj.city}"
    user_details.short_description = 'Customer Details'
    
    fieldsets = (
        ('Customer Information', {
            'fields': ('user', 'user_details', 'address', 'city', 'phone')
        }),
        ('Order Details', {
            'fields': ('total_price', 'item_count', 'created_at')
        }),
    )
    
    readonly_fields = ('created_at', 'total_price', 'item_count', 'user_details')


admin.site.register(Product)
admin.site.register(Order, OrderAdmin)
admin.site.register(Coupon)
