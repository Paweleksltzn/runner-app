import { Component, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { actions, Reducers } from 'src/app/store';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { ModalController } from '@ionic/angular';
import { ActivateCoachAccountComponent } from './activateCoachAccount/activate-coach-account/activate-coach-account.component';
import { UserService } from '../../services/user.service';
import * as storeState from 'src/app/shared/interfaces/store/index';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public selectedGradient = 1;
  public accessLevel: number;
  public currentModal: HTMLIonModalElement;
  constructor( private store: Store<Reducers>,
               private authService: AuthService,
               private modalController: ModalController,
               private userService: UserService
               ) { }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.accessLevel = state.ownerAccessLevel;
      this.selectedGradient = state.ownerGradient;
    });
  }

  public changeProfileTheme(selectedTheme: any) {
    this.selectedGradient = selectedTheme;
    this.store.dispatch(actions.profileAction.setTheme({gradient: selectedTheme}));
    this.userService.changeGradient(selectedTheme).subscribe(res => {});
  }

  public logOut() {
    this.authService.signOut();
    window.location.reload();
  }

  public async displayCoachAccountActivationModal() {
    const coachAccountActivation = await this.modalController.create({
      component: ActivateCoachAccountComponent
    });
    this.currentModal = coachAccountActivation;
    return await coachAccountActivation.present();
  }

}
