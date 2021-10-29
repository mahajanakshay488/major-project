import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AngularFireStorage } from "@angular/fire/storage";

import { finalize } from "rxjs/operators";
import { Subject, Subscription } from 'rxjs';

import { EmployerService } from 'src/app/services';


@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.css']
})
export class EmployerRegisterComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  avatarLink = new Subject<any>();
  unsubs: Subscription;
  avatarUrl;

  constructor(
    private storage: AngularFireStorage,
    private EmployerService: EmployerService
  ) { }

  ngOnInit(): void {
  }

  async uploadImage(event){
    const file = event.target.files[0];
    const uploadPath = "sherySkill"+Date.now();
    const strorageRef = this.storage.ref(uploadPath);

    await this.storage.upload(uploadPath, file).snapshotChanges().pipe(
      finalize(() => strorageRef.getDownloadURL()
      .subscribe(url => this.avatarLink.next(url))) ).subscribe();

      this.unsubs = this.avatarLink.subscribe( value => this.avatarUrl = value );
  }

  registerEmployer(){
    const employer = this.form.form.value;
    employer.avatar = this.avatarUrl;
    employer.postedJobs = [''];
    employer.todoTasks = [''];
    employer.addedTasks = [''];
    this.unsubs.unsubscribe();
    console.log(employer);
    this.EmployerService.RegisterEmployer(employer);
  }

}
