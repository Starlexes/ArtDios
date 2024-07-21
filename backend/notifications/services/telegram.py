from telegram import Bot
from decouple import config

TELEGRAM_TOKEN = config("BOT_TOKEN")
TELEGRAM_CHAT_ID = config("CHAT_ID")

def send_to_telegram(data):
    bot = Bot(token=TELEGRAM_TOKEN)
    message = f'Имя: {data["name"]}\n\nТелефон: {data["tel"]}\n\nПочта: {data["email"]}\n\nКомментарии: {data["comments"]}'
    bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=message)