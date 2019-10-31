import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageLoaderConfigService } from 'ionic-image-loader';

@Component({
  selector: 'app-coach-user',
  templateUrl: './coach-user.component.html',
  styleUrls: ['./coach-user.component.scss'],
})
export class CoachUserComponent implements OnInit {
  public profileDescription: string;
  public userName: string;
  public userSurname: string;
  public selectedProfileTab: number;
  public camera: Camera;
  constructor(public actionSheetController: ActionSheetController, public imgSetConf: ImageLoaderConfigService) {
    this.imageConfigure();
   }

  ngOnInit() {
    this.userName = "Jacek";
    this.userSurname = "Soplica";
    this.profileDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum congue facilisis.';
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
    this.imgSetConf.enableSpinner(true);
    this.imgSetConf.setHeight('70%');
  }
}
