import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public selectedGradient: number = 1;
  constructor() { }

  ngOnInit() {}

  changeProfileTheme(selectedTheme: number) {
    this.selectedGradient = selectedTheme;
    if (this.selectedGradient === 1){
      document.querySelector('.profile-picture').style.backgroundImage = 
      'linear-gradient(to left bottom, #15e6b5, #39e9b1, #4fecad, #61efaa,#71f2a6, #6ff19e, #6eef95, #6eee8c, #5ce87b, #49e268, #32dc55, #09d63f)';

      document.querySelector('.tab-select').style.borderBottomColor = 'mix(#09d63f, #15e6b5)';
    }
    if (this.selectedGradient === 2){
      document.querySelector('.profile-picture').style.backgroundImage = 
      'linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)';

      document.querySelector('.tab-select').style.borderBottomColor = 'rgba(63,94,251,1)';
    }
    if (this.selectedGradient === 3){
      document.querySelector('.profile-picture').style.backgroundImage = 
      'linear-gradient(90deg, rgba(252,176,69,1) 30%, rgba(224,92,48,1) 69%)';

      document.querySelector('.tab-select').style.borderBottomColor = 'rgba(224,92,48,1)';
    }
  }
  
}
