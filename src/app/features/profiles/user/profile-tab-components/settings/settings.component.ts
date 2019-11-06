import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../user.module';
import { SetTheme } from './settings.action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public selectedGradient: number = 1;
  constructor( private store: Store<AppState>) { }

  ngOnInit() {}

  changeProfileTheme(selectedTheme: number) {
    this.selectedGradient = selectedTheme;
    this.store.dispatch(new SetTheme({gradient: 'dzialase'}))
  }
  
}
