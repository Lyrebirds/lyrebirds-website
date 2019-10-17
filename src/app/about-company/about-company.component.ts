import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
