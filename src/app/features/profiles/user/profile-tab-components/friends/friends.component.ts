import { Component, OnInit } from '@angular/core';
import { Reducers, actions } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import { AddFriendsComponent } from './add-friends/add-friends.component';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  public numberOfFriends: number;
  public currentModal: HTMLIonModalElement;
  public userType: number;
  public friends: UserProfile[];

  constructor(private modalController: ModalController,
              private store: Store<Reducers>,
              private userService: UserService,
              private router: Router,

              ) { }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      if (state.isMyProfile) {
        this.friends = state.ownerFriends;
        this.userType = state.ownerUserType;
      } else {
        this.friends = state.friends;
        this.userType = state.userType;
      }
    });
  }

  public async displayAddFriends() {
    const addFriendsModal = await this.modalController.create({
      component: AddFriendsComponent
    });
    this.currentModal = addFriendsModal;
    return await addFriendsModal.present();
  }

  public visitFriend(user: UserProfile) {
    this.userService.getFriendsForUserProfile(user).subscribe((friends: UserProfile[]) => {
      user.friends = friends;
      this.store.dispatch(actions.profileAction.setIsMyProfile({isMyProfile: false}));
      this.store.dispatch(actions.profileAction.loadProfile({userProfile: user}));
      this.checkIfNormalUser(user.accessLevel);
    });
  }

  public checkIfNormalUser(accessLevel: number) {
    if (accessLevel === 1) {
      this.store.dispatch(actions.profileAction.setUserType({userType: 3}));
    } else {
      this.store.dispatch(actions.profileAction.setUserType({userType: 4}));
    }
  }
}
