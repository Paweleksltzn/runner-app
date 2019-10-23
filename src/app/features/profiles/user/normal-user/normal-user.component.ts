import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.scss'],
})
export class NormalUserComponent implements OnInit {
  public profileDescription: string;
  public userName: string;
  public userSurname: string;
  public selectedProfileTab: number;

  constructor() { }

  ngOnInit() {
    this.userName = "Jacek"
    this.userSurname = "Soplica"
    this.profileDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum congue facilisis.';
  }

  switchProfileTab(selectedTab: number){
    this.selectedProfileTab = selectedTab;
  }

}
