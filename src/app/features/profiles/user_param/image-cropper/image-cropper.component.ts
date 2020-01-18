import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent implements OnInit {
  public defaultImg = null;
  public croppedImg = null;

  constructor(private store: Store<Reducers>,
    private modalController: ModalController) { }

  ngOnInit() {
    this.captureImage();
  }

  public captureImage(){
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.defaultImg = state.croppedImageUrl;
    });
    this.convertFile(this.defaultImg).subscribe(
      base64 => {
        this.defaultImg = base64;
      }
    );
  }

  public convertFile(url: string){
    return Observable.create(observer =>{
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onload = function() {
        let reader: FileReader = new FileReader();
        reader.onloadend = function() {
          observer.next(reader.result);
          observer.complete();
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET',url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  public imageCropped(event: ImageCroppedEvent){
    this.croppedImg = event.base64;
  }

  public dismissModalAndSendCroppedIamge() {
    this.store.dispatch(actions.profileAction.setImg({croppedImageUrl: this.croppedImg}));
    this.modalController.dismiss();
  }

}
