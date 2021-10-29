import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { VacanciesService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('form') form : NgForm;
  constructor(
    private vacancyService: VacanciesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async jobSearchSubmit(){
    const { title, city } = this.form.form.value;
    await  this.vacancyService.SearchVacancy(title, city);
    this.router.navigate(['/show-jobs']);
  }

}
