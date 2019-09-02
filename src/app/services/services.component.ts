import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  serviceList = [
    {
      title: 'Red Team',
      description: 'With this service we simulate a full scale attack'
    },
    {
      title: 'Tech Checkup',
      description: 'Often times, technology with known vulnerabilities are still in use, due to lack of awareness. Let us check it and update it, as this is quite easy and should be done. Often times, technology with known vulnerabilities are still in use, due to lack of awareness. Let us check it and update it, as this is quite easy and should be done.Often times, technology with known vulnerabilities are still in use, due to lack of awareness. Let us check it and update it, as this is quite easy and should be done. '
    },
    {
      title: 'Employee training/testing',
      description: 'With this service we simulate a full scale attack'
    },
    {
      title: 'Data security (GDPR)',
      description: 'With this service we simulate a full scale attack'
    },
  ]

  columns = 2

  constructor() { }

  ngOnInit() {
    this.columns = window.innerWidth < 960 ? 1 : 2;
  }

  onResize(event) {
    this.columns = event.target.innerWidth < 960 ? 1 : 2;
  }
}
