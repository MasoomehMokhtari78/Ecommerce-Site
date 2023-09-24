from django.urls import path
from . import views

urlpatterns = [
    path('home', views.firstTest),
    path('register', views.registerUser),
    path('login', views.loginUser),
    path('products', views.getProducts),
    path('addFavorite', views.addFavorite),
]