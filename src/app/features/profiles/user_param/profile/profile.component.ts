import { Component, OnInit } from '@angular/core';
import { ImageAttribute, ImageLoaderConfigService } from 'ionic-image-loader';
import { ActionSheetController, ModalController } from '@ionic/angular';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import {Plugins, CameraResultType} from '@capacitor/core';
import { Router } from '@angular/router';
import { ConversationComponent } from '../chat/conversation/conversation.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public isMyProfile: boolean;
  public currentModal;
  public user: UserProfile = {
    profileDescription: ' ',
    userName: ' ',
    userSurname: ' ',
    gradient: 1,
    imgUrl: ' ',
    userType: 0,
  };

  public imagePath = 'assets/images/profile-picture.png';
  public selectedProfileTab: number;
  public imageAttributes: ImageAttribute[] = [];

  constructor(
    public actionSheetController: ActionSheetController,
    public imgSetConf: ImageLoaderConfigService,
    public store: Store<Reducers>,
    public router: Router,
    public modalController: ModalController) {
    this.imageConfigure();
   }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.isMyProfile = state.isMyProfile;
    });
    //narazie to zostawiam tutaj w przyszłości będzie zaciągane tak jak imie i nazwisko w checkIfMyProfile()
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.user.imgUrl = state.profImgUrl;
      this.user.gradient = state.gradient;
      this.user.profileDescription = state.profileDesc;
      this.user.userType = state.userType;
    });
    this.checkIfMyProfile();
  }

  ngDoCheck(){
    this.checkIfMyProfile();
  }

  public checkIfMyProfile() {
    if(this.isMyProfile){
      this.store.pipe(select('auth')).subscribe((state: storeState.AuthState) => {
        this.user.userName = state.name;
        this.user.userSurname = state.surname;
      });
    }else {
      this.store.pipe(select('displayedUser')).subscribe((state: storeState.DisplayedUserState) => {
        this.user.userName = state.name;
        this.user.userSurname = state.surname;
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
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    this.imagePath =  profilePhoto.webPath;
  }

  public exitDisplayOtherProfileMode(){
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
}

