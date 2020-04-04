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
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { UserService } from '../../user/services/user.service';
import { ToastGeneratorService } from 'src/app/shared/services/toast-generator.service';
import { AdOptions, AdSize, AdPosition } from "capacitor-admob";
 
const { AdMob } = Plugins;
const { Camera } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  options: AdOptions = {
    adId: "ca-app-pub-5176326537772909/7922519914",
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER
  };
  public user: UserProfile = {} as any;
  public editMode = false;
  public selectedProfileTab: number;
  public imageAttributes: ImageAttribute[] = [];
  public ownerEmail: string;
  public unreadedMessagesAmount = 0;
  public scrollYPos: number;
  public ratingTab: number [] = [1, 2, 3, 4, 5];
  public slideOpts = {
    slidesPerView: 2,
    width: 360
  };

  constructor(
    private actionSheetController: ActionSheetController,
    private imgSetConf: ImageLoaderConfigService,
    private store: Store<Reducers>,
    private router: Router,
    private modalController: ModalController,
    private userService: UserService,
    private toastGeneratorService: ToastGeneratorService
    ) {
    this.imageConfigure();
    this.adsConfiguration();
   }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.ownerEmail = state.ownerEmail;
      this.user.isMyProfile = state.isMyProfile;
      if (state.isMyProfile) {
        this.loadOwnerProperties(state);
      } else {
        this.loadOtherUserProperties(state);
      }
    });
    this.getUnreadedMessagesAmount();
  }

  ionViewWillEnter() {
    this.router.navigate(['user', 'profile', 'friends']);
    this.selectedProfileTab = 1;
  }

  public deleteFriend() {
    this.userService.removeFriend(this.user._id).subscribe(res => {
      const index = this.user.friends.findIndex(friend => friend.email === this.ownerEmail);
      this.user.friends.splice(index, 1);
      this.user.isFriend = false;
      this.store.dispatch(actions.profileAction.removeFriend({removedFriendId: this.user._id}));
      this.toastGeneratorService.presentToast
      (`Pomyślnie usunięto użytkownika ${this.user.name} ${this.user.surname} z listy znajomych`, 'success');
    }, err => {
      this.toastGeneratorService.presentToast
      (`Usuwanie ze znajomych nie powiodło się`, 'danger');
    });
  }

  public switchProfileTab(selectedTab: number) {
    this.selectedProfileTab = selectedTab;
  }

  async presentActionSheet() {
    if (this.user.isMyProfile) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Zdjęcie profilowe',
      buttons: [{
        text: 'Dodaj zdjęcie',
        icon: 'photos',
        handler: () => {
          this.takePhoto();
        }},
        {
          text: 'Usuń zdjęcie',
          icon: 'photos',
          handler: () => {
            this.removePhoto();
          }}
        ]
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

  public removePhoto() {
    const imagePath = '';
    this.userService.deleteProfilePhoto().subscribe(res => {
      this.store.dispatch(actions.profileAction.setTemporaryImg({croppedImageUrl: imagePath}));
      this.toastGeneratorService.presentToast('Zdjęcie profilowe usunięte pomyślnie', 'success');
    },
    err => {
      this.toastGeneratorService.presentToast('Wystąpił bład podczas usuwania zdjęcia profilowego', 'danger');
    });
  }

  public async takePhoto() {
    const imageMimeType = 'data: image/png ;base64, ';
    const profilePhoto = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      saveToGallery: false,
      resultType: CameraResultType.Base64
    });
    const imagePath = imageMimeType  + profilePhoto.base64String;
    this.store.dispatch(actions.profileAction.setTemporaryImg({croppedImageUrl: imagePath}));
    this.displayCropper();
  }

  public exitDisplayOtherProfileMode() {
    this.store.dispatch(actions.profileAction.setIsMyProfile({isMyProfile: true}));
    this.router.navigate(['user', 'profile', 'friends']);
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
    return await conversationModal.present();
  }

  public scrollHandler(event) {
    this.scrollYPos = event.detail.currentY;
  }


  public async displayCropper() {
    const cropperModal = await this.modalController.create({
      component: ImageCropperComponent
    });
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
    this.user.isMyProfile = user.isMyProfile;
    this.user.isMale = user.ownerIsMale;
    this.user.accessLevel = user.ownerAccessLevel;
    this.user.friends = user.ownerFriends;
    this.user.invitedToFriends = user.ownerInvitedToFriends;
    this.user.friendsInvitations = user.ownerFriendsInvitations;
    this.user._id = user.ownerProfileId;
    this.user.ratedTrainers = user.ratedTrainers;
    this.user.ratesAmount = user.ownerRatesAmount;
    this.user.ratesSum = user.ownerRatesSum;
  }

  private loadOtherUserProperties(user: storeState.ProfileState) {
    this.user.gradient = user.gradient;
    this.user.imgUrl = user.imgUrl;
    this.user.email = user.email;
    this.user.name = user.name;
    this.user.surname = user.surname;
    this.user.profileDescription = user.profileDescription;
    this.user.isMyProfile = user.isMyProfile;
    this.user.isMale = user.isMale;
    this.user.accessLevel = user.accessLevel;
    this.user.friends = user.friends;
    this.user.invitedToFriends = user.invitedToFriends;
    this.user.friendsInvitations = user.friendsInvitations;
    this.user._id = user.profileId;
    this.user.ratesAmount = user.ratesAmount;
    this.user.ratesSum = user.ratesSum;
    this.user.isFriend = !!user.friends.find(friend => friend.email === this.ownerEmail);
  }

  private adsConfiguration(){
    AdMob.showInterstitial(this.options).then(
      value => {
        alert("jest git"); // true
      },
      error => {
        alert("cos sie spierdoliło"); // show error
      }
    );
 
    // Subscibe Banner Event Listener
    AdMob.addListener("onAdLoaded", (info: boolean) => {
      alert("Banner Ad Loaded");
    });
  }
  


}
