import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VacanciesService, MailService } from 'src/app/services';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  applicants;
  vacancy;
  subs: Subscription;
  aplied: boolean = true;
  aplicantTitle: string = 'Applied Aplicants';
  
  constructor(
    private vacancyService: VacanciesService, 
    private mailService: MailService
  ) { }

  ngOnInit(): void {
    this.subs = this.vacancyService.activeVac.subscribe((v: any) => {
      if(v){
        this.vacancy = v;
        this.AplicantSort();
        // console.log(v, 'activeVac')
      }
    })

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
    this.vacancyService.UpdateVacancy(this.vacancy);
    this.mailService.aplicantSelected(aplicant, this.vacancy);
    console.log(this.vacancy, 'accepted');
  }

  Rejected(aplicant){
    this.vacancy.appliedby.forEach( a => {
      if(a.email === aplicant.email){
        a.status = 'Rejected';
      }
    })
    this.vacancyService.UpdateVacancy(this.vacancy);
    console.log('rejected', this.vacancy);
  }

  AplicantSort(){

    if(this.aplied) {
      this.applicants = this.vacancy.appliedby.filter(e => e.status !== 'Selected');
      this.aplicantTitle = 'Applied Aplicants';
      if(this.applicants.length == 0){
        this.aplied = !this.aplied;
        this.AplicantSort();
      }
    }
    else {
      this.applicants = this.vacancy.appliedby.filter(e => e.status === 'Selected');
      this.aplicantTitle = 'Selected Aplicants';
    }

    this.aplied = !this.aplied;
    console.log('click', this.applicants);
  }
}
