from rest_framework import serializers
from django.contrib.auth import authenticate
from api.models import UserModel, Product
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = UserModel
        fields = '__all__'
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return ({'refresh': str(token), 'access': str(token.access_token)})

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        