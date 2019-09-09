import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SlackMessage } from '../slack-message';

@Injectable({
  providedIn: 'root'
})

export class SlackService {

  constructor(private http: HttpClient) { }

  webHook = 'https://hooks.slack.com/services/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';

  sendMessage(message: SlackMessage) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      responseType: 'text' as 'json'
    };

    this.http.post(this.webHook, message, options).subscribe(() => console.log('message sent'));
  }
}
