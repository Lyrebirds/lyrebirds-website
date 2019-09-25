import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactMessage } from '../slack-message';

@Injectable({
  providedIn: 'root'
})

export class SlackService {

  constructor(private http: HttpClient) { }

  webHook = '/api/contact';

  sendMessage(message: ContactMessage) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };

    this.http.post(this.webHook, message, options).subscribe(() => console.log('message sent'));
  }
}
