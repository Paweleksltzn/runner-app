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
  }
}
