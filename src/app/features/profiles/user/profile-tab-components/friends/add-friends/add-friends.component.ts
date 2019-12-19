import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss'],
})
export class AddFriendsComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  public dismissModal() {
    this.modalController.dismiss({});
  }
}
