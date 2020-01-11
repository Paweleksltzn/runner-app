import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { actions, Reducers } from 'src/app/store';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public selectedGradient = 1;
  constructor( private store: Store<Reducers>,
               private authService: AuthService,
               private userService: UserService
               ) { }

  ngOnInit() {}

  public changeProfileTheme(selectedTheme: any) {
    this.selectedGradient = selectedTheme;
    this.store.dispatch(actions.profileAction.setTheme({gradient: selectedTheme}));
    this.userService.changeGradient(selectedTheme).subscribe(res => {});
  }

  public logOut() {
    this.authService.signOut();
    window.location.reload();
  }

}
