import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { EmployeeService, VacanciesService } from 'src/app/services';

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
  constructor(
    private vacancyService: VacanciesService,
    private employeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(){
    this.employeService.employee$.subscribe(e => {
      
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
    this.subs = this.employeService.employee$.subscribe( employee => {

      const{name, email, resume} = employee;
      let status = 'applied';
      const emp = {name, email, resume, status};
      let newVacancy = this.vacancy;

      (newVacancy.appliedby.length === 1 && newVacancy.appliedby[0] !== 'object') ?
      newVacancy.appliedby[0] = emp : newVacancy.appliedby.push(emp);

      this.vacancyService.UpdateVacancy(newVacancy);

      this.subs.unsubscribe();

      /* const{
        title, avatar, role, skills, salary, experience, qualification, 
        course, description, gender, city, postedby
      } = this.vacancy;

      const employeVacancy = {
        title, avatar, role, skills, salary, experience, qualification, 
        course, description, gender, city, postedby
      };

      (employee.apliedJobs.length === 1 && employee.apliedJobs[0] !== 'object') ?
      employee.apliedJobs[0] = employeVacancy : employee.apliedJobs.push(employeVacancy);
      
      this.employeService.UpdateEmployee(employee); */

    });

    this.router.navigate(['/employe-dash']);

  }
}
