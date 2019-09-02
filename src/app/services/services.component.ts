import { Component, OnInit } from '@angular/core';
import { OUR_SERVICES } from '../ourServices';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  serviceList = OUR_SERVICES

  columns = 2

  constructor() { }

  ngOnInit() {
    this.columns = window.innerWidth < 960 ? 1 : 2;
  }

  onResize(event) {
    this.columns = event.target.innerWidth < 960 ? 1 : 2;
  }
}
