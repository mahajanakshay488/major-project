import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VacanciesService } from 'src/app/services';

@Component({
  selector: 'app-show-jobs',
  templateUrl: './show-jobs.component.html',
  styleUrls: ['./show-jobs.component.css']
})
export class ShowJobsComponent implements OnInit, OnDestroy {
matchedVacancy;
subs: Subscription;
  constructor(
    private vacancyService: VacanciesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs = this.vacancyService.searchVacancy.subscribe(value => {
      this.matchedVacancy = value;
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
