from django.contrib import admin
from .models import UserModel, Product, Order, Cart
# Register your models here.

admin.site.register(UserModel)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Cart)