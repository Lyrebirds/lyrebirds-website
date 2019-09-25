import datetime
import json

class SlackMessage:
    channel: str = '#contactpage'
    text: str = 'Ny besked fra kontaktsiden!'
    response_type: str = "in_channel"

    def toJSON(self):
        return self.__dict__
    
    def __init__(self, name: str, email: str, phone: str, subject: str, messageText: str, trelloCardUrl: str, now: str):
        self.name = name
        self.email = email
        self.phone = phone
        self.subject = subject
        self.messageText = messageText
        self.trelloCardUrl = trelloCardUrl
        self.channel: str = '#contactpage'
        self.text: str = 'New message from the Contact Page!'
        self.response_type: str = "in_channel"
        self.now = now
        self.blocks = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"#{self.text}"
            }
        },
        {
            "type": "section",
            "fields": [
                {
                    "type": "mrkdwn",
                    "text": f'*Sender:*\n{self.name}'
                },
                {
                    "type": "mrkdwn",
                    "text": f'*Sent:*\n{self.now}'
                },
                {
                    "type": "mrkdwn",
                    "text": f'*Email:*\n{self.email}'
                },
                {
                    "type": "mrkdwn",
                    "text": f'*Phone:*\n{self.phone}'
                },
                {
                    "type": "mrkdwn",
                    "text": f'*Trello Card:*\n{self.trelloCardUrl}'
                }
            ]
        },
        {
            "type": "divider"
        }, {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f'*{self.subject}*'
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f'{self.messageText}'
            }
        }
    ]