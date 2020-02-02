import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'src/app/shared/interfaces/notifications/notification';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() notification: Notification;

  constructor() { }

  ngOnInit() {}

}
