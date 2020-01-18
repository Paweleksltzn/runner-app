import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'src/app/shared/interfaces/notifications/notification';

@Component({
  selector: 'app-friends-invitation-response',
  templateUrl: './friends-invitation-response.component.html',
  styleUrls: ['./friends-invitation-response.component.scss'],
})
export class FriendsInvitationResponseComponent implements OnInit {
  @Input() notification: Notification;

  constructor() { }

  ngOnInit() {}

}
