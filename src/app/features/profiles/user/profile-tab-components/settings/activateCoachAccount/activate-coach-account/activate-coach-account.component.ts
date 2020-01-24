import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoachAccountService } from './coach-account.service';
import { AuthService } from '../../../../../../../core/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';

@Component({
  selector: 'app-activate-coach-account',
  templateUrl: './activate-coach-account.component.html',
  styleUrls: ['./activate-coach-account.component.scss'],
})
export class ActivateCoachAccountComponent implements OnInit {
  public areTermsOfUseAccepted = false;
  public newAccessLevel = 2;

  constructor(
    private modalController: ModalController,
    private coachAccountService: CoachAccountService,
    private authService: AuthService, 
    public store: Store<Reducers>) { }

  ngOnInit() {}

  public dismissModal() { 
    this.modalController.dismiss({});
  }

  public activateCoachAccount() {
    this.areTermsOfUseAccepted = true; 
    this.coachAccountService.setCoach(this.newAccessLevel).pipe().subscribe(
      response => {this.authService.token = response}
    );
    this.store.dispatch(actions.profileAction.setOwnerAccessLevel({ownerAccessLevel: this.newAccessLevel}));
  }

}
