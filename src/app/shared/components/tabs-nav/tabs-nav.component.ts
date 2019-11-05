import { Component, OnInit, Input } from '@angular/core';
import { TabsNavLink } from '../../interfaces/tabsNavLink';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/shared/interfaces/auth/AuthState';

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

  constructor(private store: Store<{auth: AuthState}>) { }

  ngOnInit() {
    this.childrenTab = this.navLinks[0].children;
    this.activeNavLinkLabel = this.navLinks[0].label;
    this.store.pipe(select('auth')).subscribe((state: AuthState) => {
      this.accessLevel = state.accessLevel;
    });
  }

  public checkIfSecondaryTabVisible(clickedLink: TabsNavLink) {
    this.childrenTab = clickedLink.children || [];
    this.activeNavLinkLabel = clickedLink.label;
  }

}
