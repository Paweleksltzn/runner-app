import { Component, OnInit } from '@angular/core';
import { tabNavOptions } from './tabs-nav-options';
import { TabsNavLink } from '../../interfaces/tabsNavLink';

@Component({
  selector: 'app-tabs-nav',
  templateUrl: './tabs-nav.component.html',
  styleUrls: ['./tabs-nav.component.scss'],
})
export class TabsNavComponent implements OnInit {
  public navLinks: TabsNavLink[];

  constructor() { }

  ngOnInit() {
    this.navLinks = tabNavOptions;
  }

}
