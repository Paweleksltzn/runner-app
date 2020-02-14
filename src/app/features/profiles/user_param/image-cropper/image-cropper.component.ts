import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../user/services/user.service';
import { ToastGeneratorService } from 'src/app/shared/services/toast-generator.service';
import { convertBase64ToImage } from './ImageTypeConverter';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent implements OnInit {
  public defaultImg: string;
  public croppedImg = null;

  constructor(private store: Store<Reducers>,
              private modalController: ModalController,
              private userService: UserService,
              private toastGeneratorService: ToastGeneratorService) { }

  ngOnInit() {
    this.captureImage();
  }

  public captureImage() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.defaultImg = state.croppedImageUrl;
    });
  }

  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImg = event.base64;
  }

  public dismissModalAndSendCroppedIamge() {
    const file = convertBase64ToImage(this.croppedImg);
    this.store.dispatch(actions.profileAction.setImg({ownerImgUrl: this.croppedImg}));
    this.dismissModal();
    this.saveImage(file);
  }

  public dismissModal(){
    this.modalController.dismiss();
  }

  private saveImage(image: File) {
    const postData = new FormData();
    postData.append('profileImage', image);
    this.userService.changeProfileImage(postData).subscribe(res => {
      this.store.dispatch(actions.profileAction.setImg({ownerImgUrl: res.imgUrl}));
      this.toastGeneratorService.presentToast('Zdjęcie profilowe zmienione pomyślnie', 'success');
    }, err => {
      this.toastGeneratorService.presentToast('Wystąpił bład przy zmianie zdjęcia profilowego', 'danger');
    });
  }

}
