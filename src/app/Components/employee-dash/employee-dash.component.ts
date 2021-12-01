import { Component, OnInit } from '@angular/core';
import { EmployeeService, VacanciesService } from 'src/app/services';
import { Router } from "@angular/router";

@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.css']
})
export class EmployeeDashComponent implements OnInit {
  vacancy;
  employe;
  constructor(
    private EmployeeService: EmployeeService,
    private vacancyService: VacanciesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.EmployeeService.employee$.subscribe(e => {
      this.employe = e;
    });
    this.getVacancy();
  }

  getVacancy(){
    this.vacancyService.FetchVacancy()
    .subscribe((v: any) => {
      console.log(v);

      let vac = v.filter(v => {
        var valid = false;
        
        v.appliedby.forEach(el => {
            if(el.email === this.employe.email){
              valid = true;
            };
        });

        if(valid) return v;
      });
      console.log(vac);

      (vac.length > 0) ? this.vacancy = vac : null;

    });
  }

  jobDetails(vac){
    this.vacancyService.activeVacancy.next(vac);
    this.router.navigate(['/jobs-desc']);
    console.log('click', vac);
  }
}
