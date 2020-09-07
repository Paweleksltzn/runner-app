import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnInit {
  @Input()
  public isProfileTabButton = false;
  
  constructor(private menuController: MenuController) { }

  ngOnInit() {}

  openMenu() {
    this.menuController.enable(true, 'first');
    this.menuController.open('first');
  }

}
