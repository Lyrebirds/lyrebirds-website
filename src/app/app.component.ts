import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lyrebirds';
  pages = [
    { route: "/", name: "Home" },
    { route: "/about", name: "About" },
    { route: "/contact", name: "Contact" },
    { route: "/services", name: "Services" },
  ];
}
