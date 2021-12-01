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

      const { title, role, skills, salary, city, work,
       qualification, course, description, gender 
      } = vacancy;

      vacancy.skills = skills.split(',');
      vacancy.postedby = {name: employer.name, email: employer.email, avatar: employer.avatar};
      vacancy.appliedby = [''];

      const employerVacancy = { title, role, skills, salary, city, work,
       qualification, course, description, gender
      };

      // (employer.postedJobs.length === 1 && employer.postedJobs[0] == '') ?
      //   employer.postedJobs[0] = employerVacancy : employer.postedJobs.push(employerVacancy);
      
        console.log(vacancy, employer);

        return this.vacanciesService.CreateVacancy(vacancy);
    } );
  }

  onPatchValue(){
    this.form.form.patchValue({
      title: 'Java Development',
      role: "Programmer",
      skills: 'java, spring',
      salary: 20000,
      city: 'bhopal',
      work: 'In Office',
      qualification: '10+2 or above',
      description: 'We are looking for quick learner who has best practice with projects.',
      gender: 'both'
    })
  }

}
