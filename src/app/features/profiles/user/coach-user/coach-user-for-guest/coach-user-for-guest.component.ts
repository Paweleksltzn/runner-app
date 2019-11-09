import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageLoaderConfigService , ImageAttribute} from 'ionic-image-loader';
import { UserProfile } from '../../interfaces/user-interface';

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
    gradient: 1
  };
  
  public profileDescription: string;
  public userName: string;
  public userSurname: string;
  public selectedProfileTab: number;
  public camera: Camera;
  public imageAttributes: ImageAttribute[] = [];
  public profilePicturePath: string;
  
  constructor(public actionSheetController: ActionSheetController, public imgSetConf: ImageLoaderConfigService) {
    this.imageConfigure();
   }

  ngOnInit() {
    this.user.userName = 'Jacek';
    this.user.userSurname = 'Soplica';
    this.user.profileDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum congue facilisis.';
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
    this.profilePicturePath = 'assets/images/profile-picture.png';
  }

}
