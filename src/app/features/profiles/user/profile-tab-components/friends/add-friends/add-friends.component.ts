import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserSearcherResponse } from '../../../../../../shared/interfaces/searcher/playerSearcherResponse';
import { AddFriendService } from './add-friend.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import { UserService } from '../../../services/user.service';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { ToastGeneratorService } from 'src/app/shared/services/toast-generator.service';
@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss'],
})
export class AddFriendsComponent implements OnInit {
  public searchString: string;
  public isLoaded =  true;
  public accessLevel: number;
  public searchSubscription;
  public players: Array<UserSearcherResponse> = [];
  public playerData: storeState.ProfileState;

  constructor(
    private modalController: ModalController,
    private addFriendService: AddFriendService,
    private router: Router,
    private store: Store<Reducers>,
    private userService: UserService,
    private toastGenerator: ToastGeneratorService) { }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.playerData = state;
    });
  }

  public dismissModal() {
    this.modalController.dismiss({});
  }

  public addSearchString(event) {
    this.searchString = event.target.value;
    this.isLoaded = false;
    this.showPlayers();
  }

  public showPlayers() {
    this.players = [];
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
      this.searchSubscription = undefined;
    }
    this.searchSubscription = this.addFriendService.getPalyerSearcherResponse(this.searchString).pipe(delay(800)).subscribe(response => {
      this.isLoaded = true;
      this.players = response;
      this.players.forEach(player => {
        player.isInvitedToFriends = !!this.playerData.ownerInvitedToFriends.find(invitedPlayer => invitedPlayer.email === player.email);
        player.isFriend = !!this.playerData.ownerFriends.find(invitedPlayer => invitedPlayer._id === player._id);
        player.didInvite = !!this.playerData.ownerFriendsInvitations.find(invitatingPlayer => invitatingPlayer._id === player._id);
      });
    });

  }

  public goToProfile(user: UserSearcherResponse) {
    this.store.dispatch(actions.profileAction.setIsMyProfile({isMyProfile: false}));
    this.store.dispatch(actions.profileAction.loadProfile({userProfile: user.userProfile}));
    this.accessLevel = user.accessLevel;
    this.checkIfNormalUser();
    this.router.navigateByUrl('/user/profile');
    this.dismissModal();
  }

  public checkIfNormalUser() {
    if (this.accessLevel === 1) {
      this.store.dispatch(actions.profileAction.setUserType({userType: 3}));
    } else {
      this.store.dispatch(actions.profileAction.setUserType({userType: 4}));
    }
  }

  public addToFriends(user: UserSearcherResponse) {
    if (!user.isInvitedToFriends) {
      this.userService.addFriend(user).subscribe((res: UserProfile) => {
        user.isInvitedToFriends = true;
        this.toastGenerator.presentToast('Zaproszenie zostało wysłane', 'success');
        this.store.dispatch(actions.profileAction.inviteFriend({invitedFriend: res}));
      });
    }
  }

}
