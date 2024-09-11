from telegram import Bot
from decouple import config
from celery import shared_task

TELEGRAM_TOKEN = config("BOT_TOKEN")
TELEGRAM_CHAT_ID = config("CHAT_ID")

@shared_task
def send_to_telegram(data):
    bot = Bot(token=TELEGRAM_TOKEN)
    name = f'Имя: {data["name"]}\n\n'
    phone = f'Телефон: {data["tel"] }\n\n'
    email = f'Почта: {data["email"]}\n\n' if data["email"] else ''
    comments = f'Комментарии: {data["comments"]}' if data["comments"] else ''

    message = ''.join([name, phone, email, comments])
    bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=message)