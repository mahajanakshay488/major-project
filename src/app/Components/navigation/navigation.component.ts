import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  defaultPanel: string = 'employe';
  pathString: string = 'employe' ;
  Loggedin: boolean;
  user: any;
  profLink: String = "employe";
  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.validUser.subscribe( value => {
      if(value) {
        this.Loggedin = true;
        this.user = value;
      }
      else this.Loggedin = false;
      console.log(this.user, "user");
      this.profLink = (this.user.resume)  ? "employe" : "employer";
    })
    // if()
   }

  onPanelSwitch(value){
    this.pathString = value === 'employe' ? 'employe' : 'employer' ;
  }

  Logout(){
    this.appService.Logout();
  }
}
