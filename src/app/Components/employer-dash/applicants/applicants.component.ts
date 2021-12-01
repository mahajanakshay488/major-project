import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService, VacanciesService } from 'src/app/services';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  applicants;
  vacancy;
  subs: Subscription;
  
  constructor(
    private vacancyService: VacanciesService
  ) { }

  ngOnInit(): void {
    this.subs = this.vacancyService.activeVac.subscribe((v: any) => {
      if(v){
        this.vacancy = v;
        this.applicants = v.appliedby;
        // console.log(v, 'activeVac')
      }
    })
    console.log('ngonint')

    this.vacancyService.aplicantDestroyer.subscribe(v =>{
      if(!v){
        this.vacancy = v;
      }
    })
  }

  Accepted(aplicant){
    this.vacancy.appliedby.forEach( a => {
      if(a.email === aplicant.email){
        a.status = 'Selected';
      }
    })
    console.log(this.vacancy, 'accepted');
    // this.vacancyService.UpdateVacancy(this.vacancy);
  }

  Rejected(){

  }
}
