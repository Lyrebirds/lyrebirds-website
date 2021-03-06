from flask import Flask
from flask_limiter import Limiter
from flask.logging import create_logger
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
log = create_logger(app)

trelloServiceEndpoint = os.environ.get('TRELLO_SERVICE_ENDPOINT')
trelloBoardID = os.environ.get('TRELLO_BOARD_LIST_ID')
trelloAppKey = os.environ.get('TRELLO_APP_KEY')
trelloAppToken = os.environ.get('TRELLO_APP_TOKEN')

slackServiceEndpoint = os.environ.get('SLACK_SERVICE_ENDPOINT')
slackWorkspaceID = os.environ.get('SLACK_WORKSPACE_ID')
slackServiceID = os.environ.get('SLACK_SERVICE_ID')
slackAppToken = os.environ.get('SLACK_APP_TOKEN')

slackUrl = f"{slackServiceEndpoint}/{slackWorkspaceID}/{slackServiceID}/{slackAppToken}"


@app.route("/contact", methods=['POST'])
def contact():
    name = request.get_json()['name']
    email = request.get_json()['email']
    phone = request.get_json()['phone']
    subject = request.get_json()['subject']
    body = request.get_json()['body']

    now = time.strftime("%Y-%m-%d %H:%M")

    trelloRequest = f'{trelloServiceEndpoint}?name="{subject}" | {name} | {now}&desc={body}\n\n{name}\n{email}\n{phone}&idList={trelloBoardID}&key={trelloAppKey}&token={trelloAppToken}'

    trelloResponse = requests.post(trelloRequest)

    if (trelloResponse.status_code != requests.codes['ok']):
        log.error('Got error from trello: ' + trelloResponse.raw)
        return 'Something went wrong, please try again later', 500

    cardShortLink = json.loads(trelloResponse.text)['shortLink']
    cardUrl = f'https://trello.com/c/{cardShortLink}'

    slackMessage = SlackMessage(
        name, email, phone, subject, body, cardUrl, now)

    slackResponse = requests.post(slackUrl, json=slackMessage.toJSON())

    return 'ok', 200


def run():
    app.run(host='0.0.0.0', port=5000)


if __name__ == "__main__":
    run()
