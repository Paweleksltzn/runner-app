import { Component, OnInit, Input } from '@angular/core';
import { TabsNavLink } from '../../interfaces/tabsNavLink';
import { Store, select } from '@ngrx/store';
import { Reducers } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';

@Component({
  selector: 'app-tabs-nav',
  templateUrl: './tabs-nav.component.html',
  styleUrls: ['./tabs-nav.component.scss'],
})
export class TabsNavComponent implements OnInit {
  @Input() public navLinks: TabsNavLink[];
  public accessLevel: number;
  public childrenTab: TabsNavLink[] = [];
  public activeNavLinkLabel = '';

  constructor(private store: Store<Reducers>) { }

  ngOnInit() {
    this.childrenTab = this.navLinks[0].children;
    this.activeNavLinkLabel = this.navLinks[0].label;
    this.store.pipe(select('auth')).subscribe((state: storeState.AuthState) => {
      this.accessLevel = state.accessLevel;
    });
  }

  public checkIfSecondaryTabVisible(clickedLink: TabsNavLink) {
    this.childrenTab = clickedLink.children || [];
    this.activeNavLinkLabel = clickedLink.label;
  }

}
