import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.scss']
})
export class AboutCompanyComponent implements OnInit {

  cards = [
    {
      title: "FRONT.CARDS.CONTACT.TITLE",
      content: "FRONT.CARDS.CONTACT.CONTENT",
      route: "/contact",
      button: "FRONT.CARDS.CONTACT.BUTTON",
    },
    {
      title: "FRONT.CARDS.CANARY.TITLE",
      content: "FRONT.CARDS.CANARY.CONTENT",
      route: "/canary",
      button: "FRONT.CARDS.CANARY.BUTTON"
    },
    {
      title: "FRONT.CARDS.SERVICES.TITLE",
      content: "FRONT.CARDS.SERVICES.CONTENT",
      route: "/services",
      button: "FRONT.CARDS.SERVICES.BUTTON"
    }
  ]

  constructor(private meta: Meta, private translator: TranslateService) {
    //this.meta.addTag({ name: "description", content: "Lyrebirds is a cyber security consultancy company, specialized in the discovery of security vulnerabilities, and incident prevention" });

    this.translator.get('FRONT.META.KEYWORDS').subscribe((keywords: string) => {
      this.meta.addTag({ name: "keywords", content: keywords });
    })
  }

  ngOnInit() {
  }

}
