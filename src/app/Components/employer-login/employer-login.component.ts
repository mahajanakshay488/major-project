import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployerService } from 'src/app/services';

@Component({
  selector: 'app-employer-login',
  templateUrl: './employer-login.component.html',
  styleUrls: ['./employer-login.component.css']
})
export class EmployerLoginComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  constructor(
    private employerService: EmployerService
  ) { }

  ngOnInit(): void {
  }

  loginEmployer(){
    const form = this.form.form.value;
    this.employerService.SigninEmployer(form.email, form.password);
  }

}
