import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { Reducers } from 'src/app/store';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public zoomIn: any;
  public notDisplayedNotificationsAmount: number;
  @Input()
  public backButtonVisible = false;
  @Input()
  public title = '';
  @Input()
  public additionalTemplate: TemplateRef<any>;
  @Input()
  public titlEditable = false;
  @Input()
  public isProfileTab = false;
  @Input()
  public isNotificationsTab = false;
  @Output()
  public titleChanged = new EventEmitter();
  constructor(public router: Router, private store: Store<Reducers>) { }

  ngOnInit() {
    this.store.pipe(select('notifications')).subscribe((state: storeState.NotificationsState) => {
      const newNotDisplayedNotificationsAmount = state.notifications.filter(notification => !notification.isDisplayed).length;
      if (this.notDisplayedNotificationsAmount < newNotDisplayedNotificationsAmount) {
        this.zoomIn = Math.random().toString();
      }
      this.notDisplayedNotificationsAmount = newNotDisplayedNotificationsAmount;
    });
  }

  public titleChange() {
    this.titleChanged.emit(this.title);
  }

}
