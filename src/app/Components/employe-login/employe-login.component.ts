import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from 'src/app/services';

@Component({
  selector: 'app-employe-login',
  templateUrl: './employe-login.component.html',
  styleUrls: ['./employe-login.component.css']
})
export class EmployeLoginComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  constructor(
    private EmployeeService: EmployeeService
  ) { }

  ngOnInit(): void {
  }

  signinEmployee(){
    const {email, password} = this.form.form.value;
    this.EmployeeService.SigninEmployee(email, password);
  }

}
