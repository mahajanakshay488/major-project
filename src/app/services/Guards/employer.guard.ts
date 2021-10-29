import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { EmployerService } from '../employer.service';

@Injectable({
  providedIn: 'root'
})
export class EmployerGuard implements CanActivate {

  constructor(
    private employerService: EmployerService,
    private router: Router
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.employerService.employer$.pipe(
      take(1),
      map( employer => !!employer ),
      tap( loggedIn => {
        if(!loggedIn){
          console.log('access denied!');
          this.router.navigate(['/employer-login']);
        }
      } )
    );
  }
  
}
