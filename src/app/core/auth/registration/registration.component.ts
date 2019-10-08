import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public sexChecked = 0;
  // 0 => nobody is checked
  // 1 => male is checked
  // 2 => female is checked
  constructor() { }

  ngOnInit() {}
  emphasizeIconM() {
    const male = document.getElementById('sexMale');
    const female = document.getElementById('sexFemale');
    if (this.sexChecked === 0 || this.sexChecked === 2 ) {
      male.style.borderBottom = '3px solid #555';
      female.style.borderBottom = 'none';
      this.sexChecked = 1;
    }
  }
  emphasizeIconF() {
    const male = document.getElementById('sexMale');
    const female = document.getElementById('sexFemale');
    if (this.sexChecked === 0 || this.sexChecked === 1 ) {
      female.style.borderBottom = '3px solid #555';
      male.style.borderBottom = 'none';
      this.sexChecked = 2;
    }
  }

}
