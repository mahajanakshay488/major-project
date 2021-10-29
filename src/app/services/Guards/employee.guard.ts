import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { EmployeeService } from '../employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.employeeService.employee$.pipe(
      take(1),
      map( employee => !!employee ),
      tap( loggedIn => {
        if(!loggedIn){
          console.log('access denied!');
          this.router.navigate(['/employe-login']);
        }
      } )
    );
  }
  
}
