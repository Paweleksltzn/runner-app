import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { Conversation } from 'src/app/shared/interfaces/conversation/conversation';
import { ConversationService } from '../services/conversation.service';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  public targetProfile: UserProfile;
  public conversation: Conversation;
  public currentMessage = '';
  private ownerEmail: string;
  private userProfileIndex: number;

  constructor(private modalController: ModalController,
              private store: Store<Reducers>,
              private navParams: NavParams,
              private conversationService: ConversationService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.targetProfile = this.navParams.get('targetProfile');
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.ownerEmail = state.ownerEmail;
    });
    this.store.pipe(select('conversations')).subscribe((state: storeState.ConversationState) => {
      this.getCorrectConversation(state.conversations);
    });
    if (this.conversation.lastEditionDate) {
      this.displayConversation();
    }
  }

  public dismissModal() {
    this.modalController.dismiss({});
  }

  private getCorrectConversation(conversations: Conversation[]) {
    conversations.forEach(conversation => {
      let isCorrectConversation = true;
      if (conversation.members.length > 1) {
        conversation.members.forEach(member => {
          isCorrectConversation = member.userProfile.email === this.targetProfile.email || member.userProfile.email === this.ownerEmail;
        });
        if (isCorrectConversation) {
          this.conversation = conversation;
          this.userProfileIndex = conversation.members[0].userProfile.email === this.ownerEmail ? 0 : 1;
        }
      }
    });
    if (!this.conversation) {
      this.conversation = {} as any;
    }
  }

  public async sendMessage() {
    if (this.conversation.lastEditionDate) {
    // this.conversationService.sendMessage(this.currentMessage).subscribe((res: any) => {

    // });
    } else {
      const loading = await this.loadingController.create({
        message: 'Trwa wysyłanie',
        duration: 5000
      });
      loading.present();
      this.conversationService.createConversation(this.currentMessage, this.targetProfile.email).subscribe((conversation: Conversation) => {
        console.log(conversation);
        this.store.dispatch(actions.conversationActions.addConversation({ conversation }));
        loading.dismiss();
      });
    }
    this.currentMessage = '';
  }

  private displayConversation() {
    if (!this.conversation.members[this.userProfileIndex].isReaded) {
      this.store.dispatch(actions.conversationActions.displayConversation
        ({ displayedIndex: this.userProfileIndex, conversationId: this.conversation._id}));
    }
  }

}
