import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageLoaderConfigService , ImageAttribute} from 'ionic-image-loader';
import { UserProfile } from '../../interfaces/user-interface';
import { Store, select } from '@ngrx/store';
import { ProfileState } from '../../profile-tab-components/settings/settings.reducer';

@Component({
  selector: 'app-coach-user-for-guest',
  templateUrl: './coach-user-for-guest.component.html',
  styleUrls: ['./coach-user-for-guest.component.scss'],
})

export class CoachUserForGuestComponent implements OnInit {
  public user: UserProfile = {
    profileDescription: ' ',
    userName: ' ',
    userSurname: ' ',
    gradient: 1,
    imgUrl: ' ',
  };
  
  public profileDescription: string;
  public userName: string;
  public userSurname: string;
  public selectedProfileTab: number;
  public camera: Camera;
  public imageAttributes: ImageAttribute[] = [];
  
  constructor(
    public actionSheetController: ActionSheetController, 
    public imgSetConf: ImageLoaderConfigService,
    public store: Store<ProfileState>) {
    this.imageConfigure();
   }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe(state => { 
      this.user.imgUrl = state.profImgUrl;
      this.user.gradient = state.gradient;
      this.user.userName = state.userName;
      this.user.userSurname = state.userSurname;
      this.user.profileDescription = state.profileDesc;
     });
  }

  public switchProfileTab(selectedTab: number) {
    this.selectedProfileTab = selectedTab;
  }

  public imageConfigure() {
    this.imageAttributes.push({
      element: 'class',
      value: 'image',
      });
  }

}
