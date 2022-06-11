import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService, VacanciesService } from 'src/app/services';

@Component({
  selector: 'app-show-jobs',
  templateUrl: './show-jobs.component.html',
  styleUrls: ['./show-jobs.component.css']
})
export class ShowJobsComponent implements OnInit, OnDestroy {
matchedVacancy;
allvac:boolean;
subs: Subscription;
  constructor(
    private vacancyService: VacanciesService,
    private router: Router,
    private employeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.subs = this.vacancyService.searchVacancy.subscribe(value => {

      this.employeService.employee$.subscribe(u => {
        if(u){
          var vacanc = [];
          value.forEach(el => {
            var yes = true;

            el.appliedby.forEach(ell => {
              yes = (ell.email === u.email) ? false : true;
            })

            if(yes){
              vacanc.push(el);
            }
            this.matchedVacancy = vacanc;
            console.log(this.matchedVacancy)
          });  
        }
        else{
          this.matchedVacancy = value;
        }
        this.vacancyService.FetchVacancy().subscribe(v=>{
          if(v.length == value.length) this.allvac = true;
        })
      

      });
      
      //console.log(value);
    });
  }

  vacancyDetail(vacancy){
    this.vacancyService.activeVacancy.next(vacancy);
    //console.log(vacancy);
    this.router.navigate(['/jobs-desc']);
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
