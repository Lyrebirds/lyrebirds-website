export class SlackMessage {
    constructor(private name: string, private email: string, private phone: string, private subject: string, private messageText: string) {
        // this.date = new Date();
    }
    // private date: Date;

    channel: string = '#contactpage';
    text: string = 'Ny besked fra kontaktsiden!';
    response_type: "in_channel";
    blocks = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "#Ny besked fra Kontaktsiden!"
            }
        },
        {
            "type": "section",
            "fields": [
                {
                    "type": "mrkdwn",
                    "text": `*Afsender:*\n${this.name}`
                },
                {
                    "type": "mrkdwn",
                    "text": `*When:*\n${new Date().toISOString()}`
                },
                {
                    "type": "mrkdwn",
                    "text": `*Email:*\n${this.email}`
                },
                {
                    "type": "mrkdwn",
                    "text": `*Phone:*\n${this.phone}`
                }
            ]
        },
        {
            "type": "divider"
        }, {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*${this.subject}*`
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `${this.messageText}`
            }
        }
    ]
}