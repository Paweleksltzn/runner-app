import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {ProfileState} from './settings.reducer';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { actions } from 'src/app/store';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public selectedGradient = 1;
  constructor( private store: Store<ProfileState>, private nativeStorage: NativeStorage) { }

  ngOnInit() {}

  changeProfileTheme(selectedTheme: any) {
    this.selectedGradient = selectedTheme;
    this.store.dispatch(actions.setThemeAction.setTheme({gradient: selectedTheme}));
  }
}
