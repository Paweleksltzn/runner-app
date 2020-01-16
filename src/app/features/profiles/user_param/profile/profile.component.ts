import { Component, OnInit, DoCheck} from '@angular/core';
import { ImageAttribute, ImageLoaderConfigService } from 'ionic-image-loader';
import { ActionSheetController, ModalController, Platform } from '@ionic/angular';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import {Plugins, CameraResultType} from '@capacitor/core';
import { Router } from '@angular/router';
import { ConversationComponent } from '../chat/conversation/conversation.component';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, DoCheck {
  public currentModal: HTMLIonModalElement;
  public user: UserProfile = {
    profileDescription: undefined,
    name: undefined,
    surname: undefined,
    gradient: undefined,
    imgUrl: undefined,
    userType: undefined,
    friends: undefined,
    isMyProfile: true,
    croppedImage: undefined
  };

  public imagePath = 'assets/images/profile-picture.jpg';
  public selectedProfileTab: number;
  public imageAttributes: ImageAttribute[] = [];
  public scrollYPos: number;

  
  
  

  constructor(
    public actionSheetController: ActionSheetController,
    public imgSetConf: ImageLoaderConfigService,
    public store: Store<Reducers>,
    public router: Router,
    public modalController: ModalController,
    public platform: Platform
    ) {
    
    this.imageConfigure();
   }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.user.isMyProfile = state.isMyProfile;
      this.imagePath = state.profImgUrl;
      this.user.gradient = state.gradient;
      this.user.profileDescription = state.profileDesc;
      this.user.userType = state.userType;
    });
    this.checkIfMyProfile();
  }

  ngDoCheck() {
    this.checkIfMyProfile();
  }

  public checkIfMyProfile() {
    if (this.user.isMyProfile) {
      this.store.pipe(select('auth')).subscribe((state: storeState.AuthState) => {
        this.user.name = state.name;
        this.user.surname = state.surname;
        this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
          this.imagePath=state.croppedImageUrl;
        });
      });
    } else {
      this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
        this.user.name = state.name;
        this.user.surname = state.surname;
      });
    }
  }

  public switchProfileTab(selectedTab: number) {
    this.selectedProfileTab = selectedTab;
  }

  async presentActionSheet() {
    if (this.user.userType === 1 || this.user.userType === 2) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Zdjęcie profilowe',
      buttons: [{
        text: 'Dodaj zdjęcie',
        icon: 'photos',
        handler: () => {
          this.takePhoto();
        }
      }]
    });
    await actionSheet.present();
    } else {
      // Nothing happens
    }
  }

  public imageConfigure() {
    this.imageAttributes.push({
      element: 'class',
      value: 'image',
      });
  }

  public async takePhoto() {
    const { Camera } = Plugins;
    const profilePhoto = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
    this.imagePath =  profilePhoto.webPath;
    this.store.dispatch(actions.profileAction.setImg({croppedImageUrl: this.imagePath}));
    this.displayCropper();
  }

  public exitDisplayOtherProfileMode() {
    this.store.dispatch(actions.profileAction.setIsMyProfile({isMyProfile: true}));
    this.store.dispatch(actions.profileAction.setUserType({userType: 1}));
  }

  public async displayConversation() {
    const conversationModal = await this.modalController.create({
      component: ConversationComponent
    });
    this.currentModal = conversationModal;
    return await conversationModal.present();
  }

  public scrollHandler(event) {
    this.scrollYPos=event.detail.currentY;
  }

  public async displayCropper() {
    const cropperModal = await this.modalController.create({
      component: ImageCropperComponent
    });
    this.currentModal = cropperModal;
    return await cropperModal.present();
  }

}

