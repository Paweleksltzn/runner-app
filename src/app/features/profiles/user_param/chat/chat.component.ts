import { Component, OnInit } from '@angular/core';
import { ConversationComponent } from './conversation/conversation.component';
import { ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { Conversation } from 'src/app/shared/interfaces/conversation/conversation';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public currentModal;
  public conversations: Conversation[];
  public ownerEmail: string;

  constructor(public modalController: ModalController,
              public store: Store<Reducers>
              ) { }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.ownerEmail = state.ownerEmail;
    });
    this.store.pipe(select('conversations')).subscribe((state: storeState.ConversationState) => {
      this.conversations = state.conversations;
      this.conversations.forEach(conversation => {
        if (conversation.members[0].userProfile.email === this.ownerEmail) {
          conversation.userIndex = 1;
        } else {
          conversation.userIndex = 0;
        }
       });
    });
  }

  public async displayConversation(conversation: Conversation) {
    const conversationModal = await this.modalController.create({
      component: ConversationComponent,
      componentProps: {
        targetProfile: conversation.members[conversation.userIndex].userProfile
      }
    });
    this.currentModal = conversationModal;
    conversationModal.onDidDismiss().then(fn => this.currentModal = undefined);
    return await conversationModal.present();
  }

}
