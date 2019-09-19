from flask import Flask
from flask import request
import requests
import os
import json

app = Flask(__name__)

trelloAppKey = os.environ.get('TRELLO_APP_KEY')
trelloAppToken = os.environ.get('TRELLO_APP_TOKEN')
contactBoardListId = "5d828870c72fb21602d25480"

@app.route("/contact")
def contact():
    name = request.args.get('name')
    email = request.args.get('email')
    phone = request.args.get('phone')
    subject = request.args.get('subject')
    messageText = request.args.get('messageText')

    url = f'https://api.trello.com/1/cards?name={subject}&idList={contactBoardListId}&key={trelloAppKey}&token={trelloAppToken}'
    
    #querystring = {"id": "createCard", "name": subject, "idList": contactBoardListId}

    print('test')

    response = requests.post(url)

    return response.text

if __name__ == "__main__":
    app.run()

# Test string: http://localhost:5000/contact?name=Jens&email=jhs@lyrebirds.dk&phone=12345678&subject=Test&messageText=This%20is%20a%20test