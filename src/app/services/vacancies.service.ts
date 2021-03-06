import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface Vacany{
  title: string,
  role: string,
  skills: Array<string>,
  salary: string,
  qualification: string,
  course: string,
  description: string,
  gender: string,
  city: string,
  work: string,
  postedby: any,
  appliedby: Array<any>
}

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {
  vacancyRef: AngularFireList<any> = null;
  searchVacancy = new BehaviorSubject<any>(null);
  activeVacancy = new BehaviorSubject<any>(null);
  activeVac = new BehaviorSubject<any>(null);
  aplicantDestroyer = new Subject<any>();

  constructor(
    private db: AngularFireDatabase,
    private router: Router
  ) {
      this.vacancyRef = db.list('/vacancy');
  }

  FetchVacancy(){
    return this.vacancyRef.snapshotChanges().pipe(
      map( changes => changes.map( c => {
        let vac = c.payload.val();
        vac.$key = c.payload.key;
        return vac;
      } ) )
    ).pipe( map( vac => vac.map( v => {
      if(v.hasOwnProperty('title')) return v;
    }) ) )
  }

  async CreateVacancy(vacancy){
    // await this.employerService.UpdateEmployer(employer);
    await this.vacancyRef.push(vacancy);
    console.log('vacancy created!');
    return this.router.navigate(['/employer-dash']);
  }

  async SearchVacancy(title, city){
    await this.FetchVacancy().subscribe( vacancy => {
        let filterVacancy = vacancy.filter( v => v.title.toLowerCase().includes(title.toLowerCase()) && 
        v.city.toLowerCase() === city.toLowerCase());
        this.searchVacancy.next(filterVacancy);
    });
  }

  UpdateVacancy(vac: any){
    let key = vac.$key;
    delete vac['$key'];
    
    this.vacancyRef.update(key, vac);
    console.log(vac, 'vacancy updated!');
  }

  deleteVacancy(vac: any){
    let key = vac.$key;
    delete vac['$key'];
    this.vacancyRef.remove(key);
    console.log('vacancy deleted');
  }
}
