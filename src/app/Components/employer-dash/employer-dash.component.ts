import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { EmployeeService, EmployerService, VacanciesService } from 'src/app/services';
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-employer-dash',
  templateUrl: './employer-dash.component.html',
  styleUrls: ['./employer-dash.component.css']
})
export class EmployerDashComponent implements OnInit {
  vacancy;
  employer;

  constructor(
    // private router: Router,
    private employerService: EmployerService,
    private vacancyService: VacanciesService,
  ) { }

  ngOnInit(): void {
    this.employerService.employer$.subscribe(e => {
      this.employer = e;
      // e.postedJobs[0].hasOwnProperty('title') ?
      // this.vacancy = e.postedJobs : null;
    });

    this.getVacancy();
  }

  getVacancy(){
    this.vacancyService.FetchVacancy()
    .pipe(map(v =>{ 
      return v.map(v => {
        if(v.postedby.email === this.employer.email){
          return v
        };
      }
    )}))
    .subscribe(v => {
      v[0].hasOwnProperty('title') ?
      this.vacancy = v : null;
      // console.log(v);
    });
  }

  getApplicants(vacancy, target){
    this.vacancyService.activeVac.next(vacancy);
    console.log(vacancy, 'get.ap');
    setTimeout(() => {
      this.scroll(target);
    }, 300);
  }

  deleteVacancy(vac){
    this.vacancyService.deleteVacancy(vac);
  }

  applicantDestroy(){
    this.vacancyService.aplicantDestroyer.next(null);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

}
