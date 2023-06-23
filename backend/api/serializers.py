from rest_framework import serializers
from django.contrib.auth import authenticate
from api.models import UserModel
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
        # ['id', 'is_superuser', "username",  "password", "email"]

# class UserRegisterSerializer(serializers.ModelSerializer):
#     """
#     Serializer class to serialize registration requests and create a new user.
#     """
#     class Meta:
#         model = UserModel
#         fields = ("id", "username", "email", "password")
#         extra_kwargs = {"password": {"write_only": True}}

#     def create(self, validated_data):
#         return UserModel.objects.create_user(**validated_data)

# class UserLoginSerializer(serializers.Serializer):
#     """
#     Serializer class to authenticate users with email and password.
#     """
#     email = serializers.CharField()
#     password = serializers.CharField(write_only=True)

#     def validate(self, data):
#         user = authenticate(**data)

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = UserModel
        fields = '__all__'
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return ({'refresh': str(token), 'access': str(token.access_token)})