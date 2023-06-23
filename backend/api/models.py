from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser
from django.utils import timezone
from django.contrib.auth.models import UserManager
# Create your models here.

class UserModel(AbstractBaseUser):
    username = models.CharField(max_length=100, unique=True, blank=False)
    firstName = models.CharField(max_length=100, blank=True)
    lastName = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=False)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    # img
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = [username, email]

    objects = UserManager()

class Product(models.Model):
    title = models.CharField(max_length=200, unique=True, blank=False)
    desc = models.CharField(max_length=500, blank=False)
    # img
    categories = models.JSONField(default="{}")
    size = models.JSONField(default="{}")
    color = models.JSONField(default="{}")
    price = models.IntegerField(blank=False)
    inStock = models.BooleanField(default=True)
    date_added = models.DateTimeField(default=timezone.now)

class Cart(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE)
    
    date_added = models.DateTimeField(default=timezone.now)

class Order(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    amount = models.IntegerField(blank=False)
    address = models.CharField(max_length=500, blank=False)
    status = models.CharField(max_length=50,default="pending")
    date_added = models.DateTimeField(default=timezone.now)

