from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, UserSerializerWithToken
from api.models import UserModel
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.db import IntegrityError

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
        return Response("You can't use this username")

@api_view(['POST'])
def loginUser(request):
    data = request.data
    user = authenticate(username=data['username'], password=data['password'])
    if user is None:
            return Response('A user with this email and password was not found.')
    # TODO: add access and refresh token
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)
