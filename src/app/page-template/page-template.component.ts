import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss']
})
export class PageTemplateComponent implements OnInit {
  mobile = false;
  scrollLimit: number = 100;
  scrolled: boolean = false;

  pages = [
    { route: "/", name: "PAGES.HOME" },
    { route: "/services", name: "PAGES.SERVICES" }
  ];

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
    if (window.screen.width <= 823) { // 768px portrait
      this.mobile = true;
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  onActivate(event) {
    document.querySelector('mat-sidenav-content').scrollTo(0, 0);
    this.scrolled = false;
  }

  scroll = (event: any): void => {
    this.scrolled = event.srcElement.scrollTop > this.scrollLimit;
  }
}