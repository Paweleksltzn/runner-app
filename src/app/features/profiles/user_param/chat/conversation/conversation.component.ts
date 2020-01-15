import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  public email: string;
  public conversationMessges = [
    {isSended: true, message: 'Cześć.'},
    {isSended: false, message: 'No siema.'},
    {isSended: true, message: 'Potrzebuje nowy trening.'},
    {isSended: false, message: 'Okej, rozumiem jakieś nowe cele?'}
  ];
  constructor(public modalController: ModalController, public store: Store<Reducers>) { }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.email = state.email;
    });
  }

  public dismissModal() {
    this.modalController.dismiss({});
  }
}
