import { Component } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pages = [
    { route: "/", name: "PAGES.HOME" },
    { route: "/about", name: "PAGES.ABOUT" },
    { route: "/contact", name: "PAGES.CONTACT" },
    { route: "/services", name: "PAGES.SERVICES" },
    { route: "/news/all", name: "PAGES.NEWS"}
  ];

  scrollLimit: number = 100;
  scrolled: boolean = false;

  constructor(private localize: LocalizeRouterService, private meta:Meta, private translator:TranslateService) {  
    this.translator.get('FRONT.META.AUTHOR').subscribe((author: string) => {
      this.meta.addTag({ name: "author", content: author});
    })
  }

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
