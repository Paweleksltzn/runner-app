import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlayerSearcherResponse } from '../../../../../../shared/interfaces/searcher/playerSearcherResponse';
import { AddFriendService } from './add-friend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss'],
})
export class AddFriendsComponent implements OnInit {
  public searchString: string;
  public player: PlayerSearcherResponse = {
    email: '',
    name: '',
    surname: '',
    isMale: undefined
  };
  public players: Array<PlayerSearcherResponse> = [];
  constructor(
    private modalController: ModalController, 
    private addFriendService: AddFriendService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public dismissModal() {
    this.modalController.dismiss({});
  }

  public addSearchString(event) {
    this.searchString = event.target.value;
    this.showPlayers();
  }

  public showPlayers() {
    this.addFriendService.getPalyerSearcherResponse(this.searchString).subscribe(response => {
      for(let index in response){
        this.player = response[index];
        this.players.push(this.player);
      } 
      console.log(this.player.name);
    });
    this.players = [];
  }

}
