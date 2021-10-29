import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AngularFireStorage } from "@angular/fire/storage";

import { finalize } from "rxjs/operators";
import { Subject, Subscription } from 'rxjs';

import { EmployeeService } from "../../services";

@Component({
  selector: 'app-employe-register',
  templateUrl: './employe-register.component.html',
  styleUrls: ['./employe-register.component.css']
})
export class EmployeRegisterComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  avatarLink = new Subject<any>();
  unsubs: Subscription;
  avatarUrl;

  constructor(
    private storage: AngularFireStorage,
    private EmployeeService: EmployeeService
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

    //console.log(file);
  }

  registerEmployee(){
    const employee = this.form.form.value;
    employee.avatar = this.avatarUrl;
    employee.apliedJobs = [''];
    employee.addedTasks = [''];
    this.unsubs.unsubscribe();
    this.EmployeeService.RegisterEmployee(employee);
  }

}
