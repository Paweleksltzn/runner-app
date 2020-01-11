import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { actions, Reducers } from 'src/app/store';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { ModalController } from '@ionic/angular';
import { ActivateCoachAccountComponent } from './activateCoachAccount/activate-coach-account/activate-coach-account.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public selectedGradient = 1;
  public currentModal: HTMLIonModalElement;
  constructor( private store: Store<Reducers>,
               private authService: AuthService,
               private modalController: ModalController
               ) { }

  ngOnInit() {}

  public changeProfileTheme(selectedTheme: any) {
    this.selectedGradient = selectedTheme;
    this.store.dispatch(actions.profileAction.setTheme({gradient: selectedTheme}));
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
