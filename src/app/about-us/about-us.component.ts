import { Component, OnInit } from '@angular/core';
import { EMPLOYEES } from '../employeeList';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  employees = EMPLOYEES;

  constructor() { }

  ngOnInit() {
  }

}
