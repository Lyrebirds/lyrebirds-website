import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServicesComponent implements OnInit {
  serviceList = [
    {
      id: "CHECKUP",
      title: "",
      intro: "",
      content: "",
      image: "/assets/img/router_laptop.jpg"
    },
    {
      id: "EVAL",
      title: "",
      intro: "",
      content: "",
      image: "/assets/img/horizont_javascript_close.jpg"
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

  constructor(translate: TranslateService) {
    this.serviceList.forEach(service => {
      translate.get('SERVICES.' + service.id).subscribe(res => {
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
