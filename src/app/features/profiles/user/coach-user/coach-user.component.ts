import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageLoaderConfigService , ImageAttribute} from 'ionic-image-loader';
import { Store, select } from '@ngrx/store';
import { ProfileState } from '../profile-tab-components/settings/settings.reducer';
import { UserProfile } from '../interfaces/user-interface';


@Component({
  selector: 'app-coach-user',
  templateUrl: './coach-user.component.html',
  styleUrls: ['./coach-user.component.scss'],
})
export class CoachUserComponent implements OnInit {
  public user: UserProfile = {
    profileDescription: ' ',
    userName: ' ',
    userSurname: ' ',
    gradient: 1,
    imgUrl: ' ',
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
    });
  }

  public switchProfileTab(selectedTab: number){
    this.selectedProfileTab = selectedTab;
  }

  async presentActionSheet() {
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
  }

  public imageConfigure() {
    this.imageAttributes.push({
      element: 'class',
      value: 'image',
      });
  }
}
