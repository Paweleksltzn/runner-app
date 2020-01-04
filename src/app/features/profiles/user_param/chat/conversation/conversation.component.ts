import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatService } from '../../../../../shared/services/chat.service';
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
  constructor(public modalController: ModalController, private chatService: ChatService) { }

  ngOnInit() {
    this.email=this.chatService.chattedUserEmail();
  }

  public dismissModal() {
    this.modalController.dismiss({});
  }
}
