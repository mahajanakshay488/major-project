import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AngularFireStorage } from "@angular/fire/storage";

import { finalize } from "rxjs/operators";
import { Subject, Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  employe;
  @ViewChild('form') form: NgForm;

  avatarLink = new Subject<any>();
  unsubs: Subscription;
  avatarUrl;

  constructor(
    private EmployeeService: EmployeeService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.EmployeeService.employee$.subscribe(e => {
      this.employe = e;
    });
  }

  async uploadImage(event){
    const file = event.target.files[0];
    const uploadPath = "Resume"+Date.now();
    const strorageRef = this.storage.ref(uploadPath);

    await this.storage.upload(uploadPath, file).snapshotChanges().pipe(
      finalize(() => strorageRef.getDownloadURL()
      .subscribe(url => this.avatarLink.next(url))) ).subscribe();

      this.unsubs = this.avatarLink.subscribe( value => {
        // this.avatarUrl = value;
        const employee = this.form.form.value;
        employee.resume = value;
        this.unsubs.unsubscribe();
        this.EmployeeService.UpdateEmployee(employee);
      });

  }

}
