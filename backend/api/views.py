from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
from api.models import UserModel, Product
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.db import IntegrityError
import json

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def firstTest(request):
    allUsers = UserModel.objects.all()
    print(allUsers)
    serializer = UserSerializer(allUsers, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):

    try:
        data = request.data
        user = UserModel.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        # token = RefreshToken.for_user(user)
        # serializer.data['tokens'] = {'refresh': str(token), 'access': str(token.access_token)}
        return Response(serializer.data)
    except IntegrityError as e:
        return Response("This username is already taken.")

@api_view(['POST'])
def loginUser(request):
    data = request.data
    print(data)
    user = authenticate(username=data['username'], password=data['password'])
    print(user)
    if user is None:
        return Response('A user with this username and password was not found.')
    # TODO: add access and refresh token
    print('here')
    token = RefreshToken.for_user(user)
    print({'id':user.id,'refresh': str(token), 'access': str(token.access_token)})
    # serializer = UserSerializerWithToken(user, many=False)
    return Response(({'id':user.id,'refresh': str(token), 'access': str(token.access_token)}))

@api_view(['GET'])
def getProducts(request):
    category = request.GET.get("category")
    products = None
    if category.lower() == "all clothes":
        products = Product.objects.all()
    elif category.lower() == "new":
        products = Product.objects.all().order_by('-id')[:2]
    else:

        products = Product.objects.filter(category="{" + category + "}")
    print(products)
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
def addFavorite(request):
    data = request.data
    user = UserModel.objects.get(id=data['user'])
    product = Product.objects.get(id=data['product'])
    user.favoriteProducts.add(product)
    user.save()
    serializer = FavoriteSerializer(user)
    print(serializer.data)
    return Response(serializer.data)

