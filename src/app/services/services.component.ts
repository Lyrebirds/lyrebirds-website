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
      image: "/assets/img/router_laptop_min.jpg",
      icon: ['fas', "laptop-code"]
    },
    {
      id: "EVAL",
      title: "",
      intro: "",
      content: "",
      image: "/assets/img/horizont_javascript_close_min.jpg",
      icon: ['fas', "bug"]
    },
    {
      id: "TRAINING",
      title: "",
      intro: "",
      content: "",
      image: "/assets/img/harbour_min.jpg",
      icon: ['fas', "users"]
    },
    {
      id: "DATA",
      title: "",
      intro: "",
      content: "",
      image: "/assets/img/horizont_javascript_far_min.jpg",
      icon: ['fas', "fingerprint"]
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
    this.columns = window.innerWidth <= 600 ? 1 : 2;
  }

  onResize() {
    this.columns = window.innerWidth <= 600 ? 1 : 2;
  }
}
