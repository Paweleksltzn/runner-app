import { Component, OnInit} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageLoaderConfigService, ImageAttribute } from 'ionic-image-loader';
import { Store, select } from '@ngrx/store';
import { State } from '../profile-tab-components/settings/settings.reducer';
import { UserData } from '../interfaces/user-interface';

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.scss'],
})

export class NormalUserComponent implements OnInit {
  public User: UserData = {
    profileDescription: ' ',
    userName: ' ',
    userSurname: ' '
  };
  public profileDescription: string;
  public userName: string;
  public userSurname: string;
  public selectedProfileTab: number;
  public camera: Camera;
  public colorGradient: any;
  public imageAttributes: ImageAttribute[] = [];
  public profilePicturePath: string;
  
  constructor(
    public actionSheetController: ActionSheetController,
    public imgSetConf: ImageLoaderConfigService,
    public store: Store<State>) {
    this.imageConfigure();
   }

  ngOnInit() {
    this.User.userName = 'Jacek';
    this.User.userSurname = 'Soplica';
    this.User.profileDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum congue facilisis.';
    this.store.select('settings').subscribe(state => { this.colorGradient = state.gradient; });
  }

  switchProfileTab(selectedTab: number){
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
            let base64Image = 'data:image/jpeg;base64,' + imageData;
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

  imageConfigure() {
    this.imageAttributes.push({
      element: 'class',
      value: 'image',
      });
    this.profilePicturePath = 'assets/images/profile-picture.png';
  }
}
