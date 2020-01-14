import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'src/app/shared/interfaces/notifications/notification';
import { Store } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import { UserService } from 'src/app/features/profiles/user/services/user.service';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { ToastGeneratorService } from 'src/app/shared/services/toast-generator.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-friends-invitation',
  templateUrl: './friends-invitation.component.html',
  styleUrls: ['./friends-invitation.component.scss'],
})
export class FriendsInvitationComponent implements OnInit {
  @Input() notification: Notification;
  @Input() index: number;

  constructor(private store: Store<Reducers>,
              private userService: UserService,
              private toastGenerator: ToastGeneratorService,
              private router: Router,
              private modalController: ModalController) { }

  ngOnInit() {}

  public acceptInvitation() {
    this.userService.confirmFriendInvitation(this.notification.author).subscribe((friendProfile: UserProfile) => {
      this.store.dispatch(actions.profileAction.addFriend({newFriend: friendProfile}));
      this.store.dispatch(actions.notificationActions.removeNotification({index: this.index}));
      this.toastGenerator.presentToast('Zaproszenie zostało zaakceptowane', 'success');
      this.modalController.dismiss();
      this.router.navigate(['user', 'profile']);
    });
  }

}
