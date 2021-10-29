import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface Employee{
  name: string,
  email: string,
  avatar: string,
  apliedJobs: Array<any>
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeRef: AngularFireList<Employee> = null;
  employee$ : Observable<any>;
  activeEmployeeId: any;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
      this.employeeRef = db.list('/employee');

      this.employee$ = this.auth.authState.pipe(
        switchMap( user => {
          if(user){
            console.log('employee token Found!');
            this.activeEmployeeId = user.uid;
            return this.db.object(`/employee/${user.uid}`).valueChanges();
          } else{
            console.log('employee token Not found!');
            return of(null);
          }
        } )
      )
   }

  FetchEmployee(){

  }

  RegisterEmployee(employee){
    this.auth.createUserWithEmailAndPassword(employee.email, employee.password).then(employe => {
      const { name, email, avatar, apliedJobs } = employee;
      this.CreateEmployee({ name, email, avatar, apliedJobs }, employe.user.uid);
    });
  }

  CreateEmployee(employee: Employee, eid){ 
    this.db.database.ref(`/employee/${eid}`).set(employee);
    console.log('employee created !');
    this.router.navigate(['/employe-dash']);
  }

  SigninEmployee(email, password){
    this.auth.signInWithEmailAndPassword(email, password).then(employe => {
      console.log('employee signIn !');
      this.router.navigate(['/employe-dash']);
    });
  }

  SignoutEmployee(){
    this.auth.signOut();
    console.log('employee signOut !');
      this.router.navigate(['/employe-login']);
  }

  UpdateEmployee(employee){
    this.employeeRef.update(this.activeEmployeeId, employee);
    console.log('employee updated!');
  }
}
