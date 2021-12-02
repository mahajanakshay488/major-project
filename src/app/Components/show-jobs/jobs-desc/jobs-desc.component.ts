import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { EmployeeService, MailService, VacanciesService } from 'src/app/services';

@Component({
  selector: 'app-jobs-desc',
  templateUrl: './jobs-desc.component.html',
  styleUrls: ['./jobs-desc.component.css']
})
export class JobsDescComponent implements OnInit {
  vacancy;
  notApplied: boolean = true;
  status;
  subs: Subscription;
  employe;

  constructor(
    private vacancyService: VacanciesService,
    private employeService: EmployeeService,
    private mailService: MailService,
    private router: Router
  ) { }

  ngOnInit(){
    this.employeService.employee$.subscribe(e => {
      this.employe = e;    
      this.vacancyService.activeVacancy.subscribe(value => {
        this.vacancy = value;
  
        value.appliedby.forEach(el => {
          if(el.email === e.email){
           this.notApplied = false; 
           this.status = el.status;
            console.log(el, this.status);
          };
        });
        
      });

    })
  }

  onApplyNow(){

      const{name, email, resume} = this.employe;
      let status = 'Applied';
      const emp = {name, email, resume, status};
      let newVacancy = this.vacancy;

      (newVacancy.appliedby.length === 1 && newVacancy.appliedby[0] !== 'object') ?
      newVacancy.appliedby[0] = emp : newVacancy.appliedby.push(emp);

      this.vacancyService.UpdateVacancy(newVacancy);

      this.mailService.apliedVacancy(emp, this.vacancy);

    this.router.navigate(['/employe-dash']);

  }
}
