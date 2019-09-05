import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Lyrebirds';
  pages = [
    { route: "/", name: "Home" },
    { route: "/about", name: "About" },
    { route: "/contact", name: "Contact" },
    { route: "/services", name: "Services" },
  ];

  scrollLimit: number = 100;
  scrolled: boolean = false;

  constructor() { }

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
