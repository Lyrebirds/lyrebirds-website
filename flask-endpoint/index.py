from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask import request
import requests
import os
import json
import time
from slackmessage import SlackMessage

app = Flask(__name__)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["100 per day", "10 per hour"]
)

trelloServiceEndpoint = os.environ.get('TRELLO_SERVICE_ENDPOINT')
trelloAppKey = os.environ.get('TRELLO_APP_KEY')
trelloAppToken = os.environ.get('TRELLO_APP_TOKEN')

slackServiceEndpoint = os.environ.get('SLACK_SERVICE_ENDPOINT')
slackWorkspaceID = os.environ.get('SLACK_WORKSPACE_ID')
slackServiceID = os.environ.get('SLACK_SERVICE_ID')
slackAppToken = os.environ.get('SLACK_APP_TOKEN')

contactBoardListId = "5d828870c72fb21602d25480"

slackUrl = f"{slackServiceEndpoint}/{slackWorkspaceID}/{slackServiceID}/{slackAppToken}"

@app.route("/contact", methods = ['POST'])
def contact():
    name = request.get_json()['name']
    email = request.get_json()['email']
    phone = request.get_json()['phone']
    subject = request.get_json()['subject']
    body = request.get_json()['body']

    now = time.strftime("%Y-%m-%d %H:%M")

    trelloRequest = f'{trelloServiceEndpoint}?name="{subject}" | {name} | {now}&desc={body}\n\n{name}\n{email}\n{phone}&idList={contactBoardListId}&key={trelloAppKey}&token={trelloAppToken}'

    trelloResponse = requests.post(trelloRequest)

    cardShortLink = json.loads(trelloResponse.text)['shortLink']

    cardUrl = f'https://trello.com/c/{cardShortLink}'

    slackMessage = SlackMessage(name, email, phone, subject, body, cardUrl, now)

    slackResponse = requests.post(slackUrl, json=slackMessage.toJSON())

    return 'ok'

def run():
    app.run(host='0.0.0.0', port=5000)

if __name__ == "__main__":
    run()
