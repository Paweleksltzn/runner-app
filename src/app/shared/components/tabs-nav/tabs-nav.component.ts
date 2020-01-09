import { Component, OnInit, Input } from '@angular/core';
import { TabsNavLink } from '../../interfaces/tabsNavLink';
import { Store, select } from '@ngrx/store';
import { Reducers } from 'src/app/store';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn } from 'ng-animate';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-tabs-nav',
  templateUrl: './tabs-nav.component.html',
  styleUrls: ['./tabs-nav.component.scss'],
  animations: [
    trigger('zoomIn', [transition('* => *', useAnimation(zoomIn))])
  ],
})
export class TabsNavComponent implements OnInit {
  @Input() public navLinks: TabsNavLink[];
  public accessLevel: number;
  public childrenTab: TabsNavLink[] = [];
  public activeNavLinkLabel = '';
  public zoomIn: any;
  public notDisplayedNotificationsAmount: number;

  constructor(private store: Store<Reducers>) { }

  ngOnInit() {
    this.childrenTab = this.navLinks[0].children;
    this.activeNavLinkLabel = this.navLinks[0].label;
    this.store.pipe(select('auth')).subscribe((state: storeState.AuthState) => {
      this.accessLevel = state.accessLevel;
    });
    this.store.pipe(select('notifications')).subscribe((state: storeState.NotificationsState) => {
      const newNotDisplayedNotificationsAmount = state.notifications.filter(notification => !notification.isDisplayed).length;
      if (this.notDisplayedNotificationsAmount < newNotDisplayedNotificationsAmount) {
        this.zoomIn = Math.random().toString(); // sprawdzic czy ta animacja dziala jak juz bedzie pobieranie z bazy i sockety
      }
      this.notDisplayedNotificationsAmount = newNotDisplayedNotificationsAmount;
    });
  }

  public checkIfSecondaryTabVisible(clickedLink: any) {
    // tabNavLink | string
    if (clickedLink.label !== undefined) {
      this.childrenTab = clickedLink.children || [];
      this.activeNavLinkLabel = clickedLink.label;
    } else {
      this.activeNavLinkLabel = clickedLink;
      this.childrenTab = [];
    }

  }

}
