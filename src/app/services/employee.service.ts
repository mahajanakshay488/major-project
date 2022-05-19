import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface Employee{
  name: string,
  email: string,
  resume: string
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
    return this.employeeRef.snapshotChanges()
      .pipe(
        map( changes => changes.map( c => {
          let emp = c.payload.val();
          return emp;
        } ) )
      )
  }

  RegisterEmployee(employee){
    this.auth.createUserWithEmailAndPassword(employee.email, employee.password).then(employe => {
      const { name, email, resume } = employee;
      this.CreateEmployee({ name, email, resume }, employe.user.uid);
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
    this.router.navigate(['/employe-dash']);
  }
  
}
