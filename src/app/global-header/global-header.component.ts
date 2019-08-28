import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss']
})
export class GlobalHeaderComponent implements OnInit {

  pages = [
    { route: "/", name: "Home" },
    { route: "/about", name: "About" },
    { route: "/contact", name: "Contact" },
    { route: "/services", name: "Services" },
  ];

  constructor() { }

  ngOnInit() {
  }
}
