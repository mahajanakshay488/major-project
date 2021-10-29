import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployerService, VacanciesService } from 'src/app/services';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  constructor(
    private vacanciesService: VacanciesService,
    private employerService: EmployerService
  ) { }

  ngOnInit(): void {
  }

  postJob(){
    this.employerService.employer$.subscribe( employer => {
      const vacancy = this.form.form.value;

      const { title, role, skills, salary, city, 
        experience, qualification, course, description, gender 
      } = vacancy;

      vacancy.skills = skills.split(',');
      vacancy.postedby = {name: employer.name, email: employer.email, avatar: employer.avatar};

      const employerVacancy = { title, role, skills, salary, city, 
        experience, qualification, course, description, gender 
      };

      (employer.postedJobs.length === 1 && employer.postedJobs[0] == '') ?
        employer.postedJobs[0] = employerVacancy : employer.postedJobs.push(employerVacancy);
      
        console.log(vacancy, employer);

        return this.vacanciesService.CreateVacancy(vacancy, employer);
    } );
  }

}
