import { Component, OnInit } from '@angular/core';
import { EMPLOYEES } from '../employeeList';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees = EMPLOYEES;

  constructor() { }

  ngOnInit() {
  }

}
