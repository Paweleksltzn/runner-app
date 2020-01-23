import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

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
              public http: HttpClient) { }

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
    this.store.dispatch(actions.profileAction.owenrImgUrl({croppedImageUrl: this.croppedImg}));
    this.modalController.dismiss();
  }

}
