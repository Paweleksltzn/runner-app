import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { setTheme } from './settings.action';
import * as fromStore from './settings.reducer';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public selectedGradient = 1;
  constructor( private store: Store<fromStore.State>) { }

  ngOnInit() {}

  changeProfileTheme(selectedTheme: any) {
    this.selectedGradient = selectedTheme;
    this.store.dispatch(setTheme({gradient: selectedTheme}));
  }
}
