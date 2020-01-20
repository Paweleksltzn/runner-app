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
  public defaultImg = null;
  public croppedImg = null;

  constructor(private store: Store<Reducers>,
    private modalController: ModalController,
    public http: HttpClient) { }

  ngOnInit() {
    this.captureImage();
  }

  public captureImage(){
    
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.defaultImg = state.croppedImageUrl;
    });
    this.getBase64ImageFromUrl(this.defaultImg).subscribe(
      base64 => {
        this.defaultImg = base64;
        alert(base64);
      },
      err => alert(err)
    );
  }

  public getBase64ImageFromUrl(url: string){
    const file = new Blob([url]);
    return Observable.create(observer =>{
        let reader: FileReader = new FileReader();
        reader.onload = () =>{
          
        }
        reader.onloadend = function() {
          observer.next(reader.result);
          observer.complete();
        };
        reader.readAsDataURL(file);
      this.http.get(url,{responseType: "blob"});
      
    })
  }

  public imageCropped(event: ImageCroppedEvent){
    this.croppedImg = event.base64;
  }

  public dismissModalAndSendCroppedIamge() {
    this.store.dispatch(actions.profileAction.setImg({croppedImageUrl: this.croppedImg}));
    this.modalController.dismiss();
  }

}
