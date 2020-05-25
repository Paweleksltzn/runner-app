import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Reducers } from 'src/app/store';
import { Achievment } from 'src/app/shared/interfaces/profile/achievment';
import * as storeState from 'src/app/shared/interfaces/store/index';

@Component({
  selector: 'app-achivments',
  templateUrl: './achivments.component.html',
  styleUrls: ['./achivments.component.scss'],
})
export class AchivmentsComponent implements OnInit {
  public achievments: Achievment[];

  constructor(private store: Store<Reducers>) { }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      if (state.isMyProfile) {
        this.achievments = state.ownerAchievments;
      } else {
        this.achievments = state.achievments;
      }
    });
  }

}
