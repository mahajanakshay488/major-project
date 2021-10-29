import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EmployeeService } from './employee.service';
import { EmployerService } from './employer.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  validUser = new Subject<any>();
  constructor(
    private employeeService: EmployeeService,
    private employerService: EmployerService,
    private router: Router
    
  ) {
      this.employeeService.employee$.subscribe( value => {
        if(value) this.validUser.next(value);
      });

      this.employerService.employer$.subscribe( value => {
        if(value) this.validUser.next(value);
      });
   }

   Logout(){
     this.validUser.next(null);
     this.employeeService.SignoutEmployee();
     this.employerService.SignoutEmployer();
     this.router.navigate(['/']);
   }
}
