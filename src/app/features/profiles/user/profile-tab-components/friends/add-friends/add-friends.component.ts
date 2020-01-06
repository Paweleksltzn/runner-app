import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserSearcherResponse } from '../../../../../../shared/interfaces/searcher/playerSearcherResponse';
import { AddFriendService } from './add-friend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import { ChatService } from '../../../../../../shared/services/chat.service'; 

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
  public player: UserSearcherResponse = {
    email: '',
    name: '',
    surname: '',
    isMale: undefined,
    accessLevel: undefined
  };
  public players: Array<UserSearcherResponse> = [];
  constructor(
    private modalController: ModalController, 
    private addFriendService: AddFriendService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public store: Store<Reducers>,
    private chatService: ChatService) { }

  ngOnInit() {
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
    if(this.searchSubscription){
      this.searchSubscription.unsubscribe();
      this.searchSubscription = undefined;
    }
    
    this.searchSubscription=this.addFriendService.getPalyerSearcherResponse(this.searchString).pipe(delay(800)).subscribe(response => {
      this.isLoaded = true;
      this.players = response 
    });
  
  }

  public goToProfile(user: UserSearcherResponse) {
    this.store.dispatch(actions.profileAction.setIsMyProfile({isMyProfile: false}));
    this.store.dispatch(actions.profileAction.profileData({email: user.email,name: user.name, surname: user.surname, isMale: user.isMale, accessLevel: user.accessLevel}));
    this.accessLevel = user.accessLevel;
    this.checkIfNormalUser();
    this.router.navigateByUrl('/user/profile');
    this.dismissModal();
  }

  public checkIfNormalUser(){
    if(this.accessLevel === 1){
      this.store.dispatch(actions.profileAction.setUserType({userType: 3}));
    }else {
      this.store.dispatch(actions.profileAction.setUserType({userType: 4}));
    }
  }

}
