import { Component, OnInit } from '@angular/core';
import { Reducers } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import { AddFriendsComponent } from './add-friends/add-friends.component';
import * as storeState from 'src/app/shared/interfaces/store/index';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  public numberOfFriends: number;
  public currentModal;
  public userType;
  constructor(public modalController: ModalController, public store: Store<Reducers>) { }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.numberOfFriends = state.numberOfFriends;
      this.userType = state.userType;
    });
  }

  public async displayAddFriends() {
    const addFriendsModal = await this.modalController.create({
      component: AddFriendsComponent
    });
    this.currentModal = addFriendsModal;
    return await addFriendsModal.present(); 
  }

}
