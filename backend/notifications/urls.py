from django.urls import path
from .views import send_telegram

urlpatterns = [
    path('send-telegram/', send_telegram),
]