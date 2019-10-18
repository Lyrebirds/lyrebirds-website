import { Component } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pages = [
    { route: "/", name: "PAGES.HOME" },
    //{ route: "/about", name: "PAGES.ABOUT" },
    { route: "/contact", name: "PAGES.CONTACT" },
    { route: "/services", name: "PAGES.SERVICES" },
  ];

  scrollLimit: number = 100;
  scrolled: boolean = false;

  constructor(private localize: LocalizeRouterService) { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true)
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
