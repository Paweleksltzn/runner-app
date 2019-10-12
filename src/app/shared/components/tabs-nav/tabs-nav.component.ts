import { Component, OnInit } from '@angular/core';
import { tabNavOptions } from './tabs-nav-options';
import { TabsNavLink } from '../../interfaces/tabsNavLink';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/shared/interfaces/auth/AuthState';

@Component({
  selector: 'app-tabs-nav',
  templateUrl: './tabs-nav.component.html',
  styleUrls: ['./tabs-nav.component.scss'],
})
export class TabsNavComponent implements OnInit {
  public navLinks: TabsNavLink[];
  public accessLevel: number;

  constructor(private store: Store<{auth: AuthState}>) { }

  ngOnInit() {
    this.navLinks = tabNavOptions;
    this.store.pipe(select('auth')).subscribe((state: AuthState) => {
      this.accessLevel = state.accessLevel;
    });
  }

}
