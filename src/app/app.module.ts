import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { environment } from 'src/environments/environment';


import { AppComponent } from './app.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { HomeComponent } from './Components/home/home.component';
import { ShowJobsComponent } from './Components/show-jobs/show-jobs.component';
import { JobsDescComponent } from './Components/show-jobs/jobs-desc/jobs-desc.component';
import { EmployeRegisterComponent } from './Components/employe-register/employe-register.component';
import { EmployerRegisterComponent } from './Components/employer-register/employer-register.component';
import { EmployerLoginComponent } from './Components/employer-login/employer-login.component';
import { EmployeLoginComponent } from './Components/employe-login/employe-login.component';
import { PostJobComponent } from './Components/post-job/post-job.component';
import { EmployerDashComponent } from './Components/employer-dash/employer-dash.component';
import { EmployeeDashComponent } from './Components/employee-dash/employee-dash.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ShowJobsComponent,
    JobsDescComponent,
    EmployeRegisterComponent,
    EmployerRegisterComponent,
    EmployerLoginComponent,
    EmployeLoginComponent,
    PostJobComponent,
    EmployerDashComponent,
    EmployeeDashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
