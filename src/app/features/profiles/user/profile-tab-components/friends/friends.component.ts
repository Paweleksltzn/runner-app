import { Component, OnInit, ViewChild } from '@angular/core';
import { Reducers, actions } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
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
  public friends: UserProfile[] = [];
  private offset = 0;
  private limit = 10;
  public scrollDisabled = false;
  public searchString: string;
  public fullFriendsArr: UserProfile[];
  @ViewChild('infiniteScroll') infiniteScroll: IonInfiniteScroll;

  constructor(private modalController: ModalController,
              private store: Store<Reducers>,
              private userService: UserService,
              private router: Router
              ) { }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      if (state.isMyProfile) {
        this.fullFriendsArr = state.ownerFriends;
      } else {
        this.fullFriendsArr = state.friends;
      }
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
    this.searchString = event.target.value;
    this.friends = [];
    this.offset = 0;
    this.scrollDisabled = false;
    this.showFriends();
  }

  public showFriends(event?) {
    if (!event) {
      this.friends = [];
    }
    let friends;
    if (this.searchString) {
      if (this.searchString.split(' ').length === 2) {
        const name = this.searchString.split(' ')[0];
        const surname = this.searchString.split(' ')[1];
        const usersFirstArr =  this.fullFriendsArr.filter((friend => {
          return friend.name.match(new RegExp(name, 'i')) && friend.surname.match(new RegExp(surname, 'i'));
        }));
        const usersSecondArr =  this.fullFriendsArr.filter((friend => {
          return friend.name.match(new RegExp(surname, 'i')) && friend.surname.match(new RegExp(name, 'i'));
        }));
        friends = [...usersFirstArr, ...usersSecondArr];
      } else {
          const searchString = this.searchString.split(' ').join('');
          friends = this.fullFriendsArr.filter((friend => {
            return (friend.name + friend.surname).match(new RegExp(searchString, 'i'));
          }));
      }
    } else {
      friends = this.fullFriendsArr;
    }

    setTimeout(() => {
      const slicedFriends = friends.slice(this.offset, this.limit + this.offset);
      this.friends = [...this.friends, ...slicedFriends];
      this.offset += this.limit;
      if (slicedFriends.length < this.limit) {
        this.scrollDisabled = true;
      } else {
        this.scrollDisabled = false;
      }
      this.infiniteScroll.complete();
    }, this.searchString ? 0 : 100);
  }

}
