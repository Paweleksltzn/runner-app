import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlayerSearcherResponse } from '../../../../../../shared/interfaces/searcher/playerSearcherResponse';
import { AddFriendService } from './add-friend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import { ChatService } from '../../../../../../shared/services/chat.service'; 
import * as storeState from 'src/app/shared/interfaces/store/index';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss'],
})
export class AddFriendsComponent implements OnInit {
  public searchString: string;
  public isLoaded =  true;
  public accessLevel: number;
  public player: PlayerSearcherResponse = {
    email: '',
    name: '',
    surname: '',
    isMale: undefined,
    accessLevel: undefined
  };
  public players: Array<PlayerSearcherResponse> = [];
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
    this.players = [];
    this.showPlayers();
  }

  public showPlayers() {
    //tutaj potrzeba lepszego rozwiązania musze dwa razy czyscic tablice bo inaczej animacja sie gryzie z wyswietlanym contentem
    this.addFriendService.getPalyerSearcherResponse(this.searchString).pipe(delay(800)).subscribe(response => {
      this.isLoaded = true;
      this.players = [];
      for(let index in response){
        this.player = response[index];
        this.players.push(this.player);
      } 
    });
  }

  public goToProfile(firstName, secondName, profileEmail, isMale , accessLevel) {
    this.store.dispatch(actions.profileAction.setIsMyProfile({isMyProfile: false}));
    this.store.dispatch(actions.profileDisplayAction.profileData({email: profileEmail,name: firstName, surname: secondName, isMale: isMale, accessLevel: accessLevel}));
    this.accessLevel = accessLevel;
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
