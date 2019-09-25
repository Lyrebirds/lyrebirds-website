import { Component, OnInit } from '@angular/core';
import { SlackService } from '../services/slack.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactMessage } from '../slack-message';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private slack: SlackService) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      subject: new FormControl(''),
      text: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
    });



  }

  onSubmit() {

    const name = this.contactForm.value['name'];
    const subject = this.contactForm.value['subject'];
    const text = this.contactForm.value['text'];
    const email = this.contactForm.value['email'];
    const phone = this.contactForm.value['phone'];
    this.slack.sendMessage(new ContactMessage(name, email, phone, subject, text));
  }

  hasError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  }
}
