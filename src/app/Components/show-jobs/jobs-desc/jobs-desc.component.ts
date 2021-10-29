import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { EmployeeService, VacanciesService } from 'src/app/services';

@Component({
  selector: 'app-jobs-desc',
  templateUrl: './jobs-desc.component.html',
  styleUrls: ['./jobs-desc.component.css']
})
export class JobsDescComponent implements OnInit, OnDestroy {
  vacancy;
  subs: Subscription;
  constructor(
    private vacancyService: VacanciesService,
    private employeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(){
    this.vacancyService.activeVacancy.subscribe(value => {
      this.vacancy = value;
      //console.log(`value ${value}`);
    });
  }

  onApplyNow(){
    this.subs = this.employeService.employee$.subscribe( employee => {
      const{
        title, role, skills, salary, experience, qualification, 
        course, description, gender, city, postedby
      } = this.vacancy;

      const employeVacancy = {
        title, role, skills, salary, experience, qualification, 
        course, description, gender, city, postedby
      };

      (employee.apliedJobs.length === 1 && employee.apliedJobs[0] !== 'object') ?
      employee.apliedJobs[0] = employeVacancy : employee.apliedJobs.push(employeVacancy);

      this.subs.unsubscribe();
      this.employeService.UpdateEmployee(employee);

    });

    this.router.navigate(['/employe-dash']);

  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
