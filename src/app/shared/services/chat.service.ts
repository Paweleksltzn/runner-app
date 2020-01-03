import { Injectable } from '@angular/core';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public profileEmail: string;
  constructor(public store: Store<Reducers>) { }

  public chattedUserEmail(){ 
    this.store.pipe(select('displayedUser')).subscribe((state: storeState.DisplayedUserState) => {
      this.profileEmail = state.email;
    });
    return this.profileEmail;
  }
}
