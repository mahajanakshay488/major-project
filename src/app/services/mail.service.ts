import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private http: HttpClient    
  ) {}

  aplicantSelected(aplicant, vacancy){

    let htmlContent = `<p><b>Hello ${aplicant.name}</b></p>
    <p>Congrats, you are selected for a ${vacancy.title} vacancy that you have applied for. <br> ${vacancy.postedby.name} will contact you. <br>All the best for your future.</p>`;
    
    let body = {email: aplicant.email, subject: 'Congrats for selection | Get-Job', htmlContent: htmlContent}

    this.http.post('http://localhost:3000/send-mail', body).subscribe( s => {
      console.log(s);
    });
  }

  apliedVacancy(aplicant, vacancy){
    let htmlContent = `<p><b>Hello ${vacancy.postedby.name}</b></p>
    <p>New applicant apply on your ${vacancy.title} vacancy.</p> 
    <h4>Applicant's Details</h4>
    <p>Name: ${aplicant.name}</p>
    <p>gmail: ${aplicant.email}</p>
    <a href="${aplicant.resume}">See Resume</a>
    <br><br>
    <p>For more actions login to Get-Job from your desktop.</p>`;

    let body = {email: vacancy.postedby.email, subject: 'You have a new aplicant | Get-Job', htmlContent: htmlContent}

    this.http.post('http://localhost:3000/send-mail', body).subscribe( s => {
      console.log(s);
    });
  }
}
