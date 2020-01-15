import { Component, OnInit } from '@angular/core';
import { ConversationComponent } from './conversation/conversation.component';
import { ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public currentModal;
  public privateConversations = [
    {whoTexted: 'Mietek', lastMessage: 'Idziesz na trening?', isReaded: false},
    {whoTexted: 'Marcin', lastMessage: 'Idziesz na trening?', isReaded: true},
    {whoTexted: 'Anna', lastMessage: 'Idziesz na trening?', isReaded: true},
  ];
  constructor(public modalController: ModalController,
              public store: Store<Reducers>
              ) { }

  ngOnInit() {
    this.store.pipe(select('conversations')).subscribe((state: storeState.ConversationState) => {
      console.log(state);
    });
  }

  public async displayConversation() {
    const conversationModal = await this.modalController.create({
      component: ConversationComponent
    });
    this.currentModal = conversationModal;
    return await conversationModal.present();
  }
}
