import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services';

@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.css']
})
export class EmployeeDashComponent implements OnInit {
  vacancy;
  employe;
  constructor(
    public EmployeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.EmployeeService.employee$.subscribe(e => {
      this.employe = e;
      e.apliedJobs[0].hasOwnProperty('title')?
      this.vacancy = e : null;
      console.log(e);
    });
  }

}
