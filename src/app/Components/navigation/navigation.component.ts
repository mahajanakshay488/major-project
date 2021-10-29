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
  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.validUser.subscribe( value => {
      if(value) this.Loggedin = true;
      else this.Loggedin = false;
    })
   }

  onPanelSwitch(value){
    this.pathString = value === 'employe' ? 'employe' : 'employer' ;
  }

  Logout(){
    this.appService.Logout();
  }
}
