from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .services.telegram import send_to_telegram

# Create your views here.
@api_view(["POST"])
def send_telegram(request):
    data = request.GET.dict()
    try:
        send_to_telegram(data)
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response(e, status=status.HTTP_400_BAD_REQUEST)
    