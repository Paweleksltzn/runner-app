import { Component, OnInit} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageLoaderConfigService } from 'ionic-image-loader';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../profile-tab-components/settings/settings.reducer';

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.scss'],
})
export class NormalUserComponent implements OnInit {
  public profileDescription: string;
  public userName: string;
  public userSurname: string;
  public selectedProfileTab: number;
  public camera: Camera;
  public colorGradient: any;
  
  constructor(
    public actionSheetController: ActionSheetController,
    public imgSetConf: ImageLoaderConfigService,
    public store: Store<fromStore.State>) {
    this.imageConfigure();
   }

  ngOnInit() {
    this.userName = 'Jacek';
    this.userSurname = 'Soplica';
    this.profileDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum congue facilisis.';
    this.store.select('gradient').subscribe(state => {this.colorGradient = state.gradient});
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
