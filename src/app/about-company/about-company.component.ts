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
      title: "FRONT.CARDS.SERVICES.TITLE",
      content: "FRONT.CARDS.SERVICES.CONTENT",
      route: "/services",
      button: "FRONT.CARDS.SERVICES.BUTTON"
    },
  ]

  constructor(private meta: Meta, private translator: TranslateService) { }

  ngOnInit() {
    this.meta.addTag({ name: "description", content: "Lyrebirds is a cyber security consultancy company, specialized in the discovery of security vulnerabilities, and incident prevention." });

    this.translator.get('FRONT.META.AUTHOR').subscribe((author: string) => {
      this.meta.updateTag({ name: "author", content: author });
    })
    this.translator.get('FRONT.META.KEYWORDS').subscribe((keywords: string) => {
      this.meta.updateTag({ name: "keywords", content: keywords });
    })
  }

}
