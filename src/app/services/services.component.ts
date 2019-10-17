import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslatorService } from '../translator.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServicesComponent implements OnInit {
  serviceList = [
    {
      id: "EVAL",
      title: "",
      intro: "",
      content: "",
      image: "/assets/img/horizont_javascript_close.jpg"
    },
    {
      id: "CHECKUP",
      title: "",
      intro: "",
      content: "",
      image: "/assets/img/router_laptop.jpg"
    },
    {
      id: "TRAINING",
      title: "",
      intro: "",
      content: "",
      image: "/assets/img/harbour.jpg"
    },
    {
      id: "DATA",
      title: "",
      intro: "",
      content: "",
      image: "/assets/img/horizont_javascript_far.jpg"
    }
  ]

  columns = 2

  constructor(translate: TranslatorService) {
    this.serviceList.forEach(service => {
      translate.translator.get('SERVICES.' + service.id).subscribe(res => {
        service.title = res.TITLE;
        service.intro = res.INTRO;
        service.content = res.BODY;
      });
    });
  }

  ngOnInit() {
    this.columns = window.innerWidth <= 960 ? 1 : 2;
  }

  onResize() {
    this.columns = window.innerWidth <= 960 ? 1 : 2;
  }
}
