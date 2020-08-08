import { Component, OnInit } from '@angular/core';
import { menuLinks } from './menu-links';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Reducers } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public menuLinks = menuLinks;
  public name = '';
  public surName = '';
  public imgUrl = '';

  constructor(private router: Router, private store: Store<Reducers>, private authService: AuthService) { }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      if (state && state.ownerName) {
        this.name = state.ownerName;
        this.surName = state.ownerSurname;
        this.imgUrl = state.ownerImgUrl;
      }
    });
  }

  public logOut() {
    this.authService.signOut();
    window.location.reload();
  }

}
