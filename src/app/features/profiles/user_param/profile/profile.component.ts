import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../user/interfaces/user-interface';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageAttribute, ImageLoaderConfigService } from 'ionic-image-loader';
import { ActionSheetController } from '@ionic/angular';
import { ProfileState } from '../../user/store/settings.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user: UserProfile = {
    profileDescription: ' ',
    userName: ' ',
    userSurname: ' ',
    gradient: 1,
    imgUrl: ' ',
    userType: 0,
  };

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
      this.user.userType = state.userType;
    });
  }

  public switchProfileTab(selectedTab: number){
    this.selectedProfileTab = selectedTab;  
  }

  async presentActionSheet() {
    if (this.user.userType === 1 || this.user.userType === 2) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Zdjęcie profilowe',
      buttons: [{
        text: 'Wybierz z galerii',
        icon: 'photos',
        handler: () => {
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          this.camera.getPicture(options).then((imageData) => {
            const base64Image = 'data:image/jpeg;base64,' + imageData;
           }, (err) => {
            // Handle error
           });
        }
      }, {
        text: 'Zrób zdjęcie',
        icon: 'videocam',
      }]
    });
    await actionSheet.present();
    } else{
      //Nothing happens
    }
  }

  public imageConfigure() {
    this.imageAttributes.push({
      element: 'class',
      value: 'image',
      });
  }

}
