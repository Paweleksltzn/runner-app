import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-activate-coach-account',
  templateUrl: './activate-coach-account.component.html',
  styleUrls: ['./activate-coach-account.component.scss'],
})
export class ActivateCoachAccountComponent implements OnInit {
  public areTermsOfUseAccepted = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public dismissModal() { 
    this.modalController.dismiss({});
  }

  public activateCoachAccount() {
    this.areTermsOfUseAccepted = true; 

  }

}
