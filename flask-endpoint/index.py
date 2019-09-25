from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask import request
import requests
import os
import json
import time

app = Flask(__name__)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["100 per day", "10 per hour"]
)

trelloAppKey = os.environ.get('TRELLO_APP_KEY')
trelloAppToken = os.environ.get('TRELLO_APP_TOKEN')
contactBoardListId = "5d828870c72fb21602d25480"

@app.route("/contact", methods = ['POST'])
def contact():
    name = request.args.get('name')
    email = request.args.get('email')
    phone = request.args.get('phone')
    subject = request.args.get('subject')
    messageText = request.args.get('body')

    url = f'https://api.trello.com/1/cards?name="{subject}" | {name} | {time.strftime("%Y-%m-%d %H:%M")}&desc={messageText}\n\n{name}\n{email}\n{phone}&idList={contactBoardListId}&key={trelloAppKey}&token={trelloAppToken}'

    return requests.post(url).text

if __name__ == "__main__":
    app.run()