import { Component, OnInit } from '@angular/core';
import { Reducers, actions } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import { AddFriendsComponent } from './add-friends/add-friends.component';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  public numberOfFriends: number;
  public currentModal: HTMLIonModalElement;
  public isMyProfile: boolean;
  public friends: UserProfile[];
  private offset = 0;
  private limit = 10;
  public searchSubscription;
  public scrollDisabled = false;
  public searchString: string;
  public isLoaded =  true;
  private fullFriendsArr: UserProfile[];
  constructor(private modalController: ModalController,
              private store: Store<Reducers>,
              private userService: UserService,
              private router: Router
              ) { }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      if (state.isMyProfile) {
        this.friends = state.ownerFriends;
      } else {
        this.friends = state.friends;
      }
      this.fullFriendsArr = this.friends;
      this.isMyProfile = state.isMyProfile;
      this.searchString = '';
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
    });
  }

  public addSearchString(event) {
    if (event.target.value) {
      this.searchString = event.target.value;
      this.isLoaded = false;
      this.offset = 0;
      this.scrollDisabled = false;
      this.showFriends();
    } else {
      this.friends = this.fullFriendsArr;
    }
  }

  public showFriends(event?) {
    if (!event) {
      this.friends = [];
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
      this.searchSubscription = undefined;
    }

    this.userService.getFriendSearcherResponse(this.searchString, this.limit, this.offset)
    .pipe(delay(800)).subscribe(response => {
      this.isLoaded = true;
      this.friends = [...this.friends, ...response];
      this.offset += this.limit;
      if (response.length < this.limit) {
        this.scrollDisabled = true;
      } else {
        this.scrollDisabled = false;
      }
    });
  }

}
