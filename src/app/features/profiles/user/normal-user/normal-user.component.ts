import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.scss'],
})
export class NormalUserComponent implements OnInit {
  public profileDescription: string;
  constructor() { }

  ngOnInit() {
    this.profileDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum congue facilisis. Fusce ornare ligula viverra, suscipit tortor ac, placerat.';
  }

}
