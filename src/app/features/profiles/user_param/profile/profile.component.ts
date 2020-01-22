import { Component, OnInit } from '@angular/core';
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
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public currentModal: HTMLIonModalElement;
  public imagePath = 'assets/images/profile-picture.jpg';
  public user: UserProfile = {} as any;
  public editMode = false;
  public selectedProfileTab: number;
  public imageAttributes: ImageAttribute[] = [];
  public ownerEmail: string;
  public unreadedMessagesAmount = 0;
  public scrollYPos: number;

  constructor(
    public actionSheetController: ActionSheetController,
    public imgSetConf: ImageLoaderConfigService,
    public store: Store<Reducers>,
    public router: Router,
    public modalController: ModalController,
    public platform: Platform,
    private userService: UserService) {
    this.imageConfigure();
   }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.user.isMyProfile = state.isMyProfile;
      if (state.isMyProfile) {
        this.loadOwnerProperties(state);
      } else {
        this.loadOtherUserProperties(state);
      }
      if (state.croppedImageUrl){ 
        this.user.imgUrl = state.croppedImageUrl
      }
    });
    this.getUnreadedMessagesAmount();
  }

  ionViewWillEnter() {
    this.router.navigate(['user', 'profile', 'friends']);
    this.selectedProfileTab = 1;
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
      resultType: CameraResultType.Base64
    });
    this.imagePath =  'data: image/jpeg ;base64, ' + profilePhoto.base64String;
    this.store.dispatch(actions.profileAction.setImg({croppedImageUrl: this.imagePath}));
    this.displayCropper();
  }

  public exitDisplayOtherProfileMode() {
    this.store.dispatch(actions.profileAction.setIsMyProfile({isMyProfile: true}));
    this.store.dispatch(actions.profileAction.setUserType({userType: 1}));
  }

  public changeEditMode() {
    this.editMode = true;
  }

  public saveDescription() {
    this.editMode = false;
    this.store.dispatch(actions.profileAction.updateDescription({newDescription: this.user.profileDescription}));
    this.userService.changeDescription(this.user.profileDescription).subscribe(res => {});
  }

  public async openChat() {
    const conversationModal = await this.modalController.create({
      component: ConversationComponent,
      componentProps: {
        targetProfile: this.user
      }
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

  private getUnreadedMessagesAmount() {
    this.store.pipe(select('conversations')).subscribe((state: storeState.ConversationState) => {
      this.unreadedMessagesAmount = 0;
      const conversations = state.conversations;
      conversations.forEach(conversation => {
        conversation.members.forEach(member => {
          if (member.userProfile.email === this.ownerEmail && !member.isReaded) {
            this.unreadedMessagesAmount++;
          }
        });
      });
    });
  }

  private loadOwnerProperties(user: storeState.ProfileState) {
    this.user.gradient = user.ownerGradient;
    this.user.imgUrl = user.ownerImgUrl;
    this.user.email = user.ownerEmail;
    this.user.name = user.ownerName;
    this.user.surname = user.ownerSurname;
    this.user.profileDescription = user.ownerProfileDescription;
    this.user.userType = user.ownerUserType;
    this.user.isMyProfile = user.isMyProfile;
    this.user.isMale = user.ownerIsMale;
    this.user.accessLevel = user.ownerAccessLevel;
    this.user.friends = user.ownerFriends;
    this.user.invitedToFriends = user.ownerInvitedToFriends;
    this.user.friendsInvitations = user.ownerFriendsInvitations;
    this.user._id = user.ownerProfileId;
  }

  private loadOtherUserProperties(user: storeState.ProfileState) {
    this.user.gradient = user.gradient;
    this.user.imgUrl = user.imgUrl;
    this.user.email = user.email;
    this.user.name = user.name;
    this.user.surname = user.surname;
    this.user.profileDescription = user.profileDescription;
    this.user.userType = user.userType;
    this.user.isMyProfile = user.isMyProfile;
    this.user.isMale = user.isMale;
    this.user.accessLevel = user.accessLevel;
    this.user.friends = user.friends;
    this.user.invitedToFriends = user.invitedToFriends;
    this.user.friendsInvitations = user.friendsInvitations;
    this.user._id = user.profileId;
  }

}

