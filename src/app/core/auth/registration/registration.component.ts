import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public isMale: boolean ;
  
  constructor() { }

  ngOnInit() {
  }
  switchSex(sexState: boolean){
    this.isMale = sexState; 
  }


}
