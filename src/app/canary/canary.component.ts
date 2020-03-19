import { Component, OnInit, InjectionToken } from '@angular/core';
import { SlackService } from '../services/slack.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactMessage } from '../slack-message';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-canary',
  templateUrl: './canary.component.html',
  styleUrls: ['./canary.component.scss']
})
export class CanaryComponent implements OnInit {
  contactForm: FormGroup;
  messageReceived: boolean = false;
  serverError: boolean = false;

  constructor(private slack: SlackService, private _snackBar: MatSnackBar, private translator: TranslateService) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
    });
  }

  onSubmit() {
    const name = this.contactForm.value['name'];
    const subject = "Lyrebirds Canary Signup";
    const text = "";
    const email = this.contactForm.value['email'];
    const phone = this.contactForm.value['phone'];
    this.slack.sendMessage(new ContactMessage(name, email, phone, subject, text)).subscribe(
      ok => { this.messageReceived = true; },
      error => {
        this.serverError = true;
        document.getElementById("intro").scrollIntoView({ behavior: "smooth" })
      })
  }

  hasError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  }
}
