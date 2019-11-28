import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public privateConversations = [
    {whoTexted: 'Mietek', lastMessage: 'Idziesz na trening?', isReaded: false}, 
    {whoTexted: 'Marcin', lastMessage: 'Idziesz na trening?', isReaded: true},
    {whoTexted: 'Anna', lastMessage: 'Idziesz na trening?', isReaded: true},
  ];
  constructor() { }

  ngOnInit() {}

}
