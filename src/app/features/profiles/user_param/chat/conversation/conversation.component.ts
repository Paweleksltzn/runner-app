import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  public conversationMessges = [
    {isSended: true, message: 'Cześć.'}, 
    {isSended: false, message: 'No siema.'},
    {isSended: true, message: 'Potrzebuje nowy trening.'},
    {isSended: false, message: 'Okej, rozumiem jakieś nowe cele?'}
  ];
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  public dismissModal() {
    this.modalController.dismiss({});
  }
}
