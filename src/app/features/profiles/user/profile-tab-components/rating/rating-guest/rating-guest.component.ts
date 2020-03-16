import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CoachAccountService } from '../../settings/activateCoachAccount/activate-coach-account/coach-account.service';
import { UserProfile } from 'src/app/shared/interfaces/profile/userInterface';
import { Store, select } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { ToastGeneratorService } from 'src/app/shared/services/toast-generator.service';
@Component({
  selector: 'app-rating-guest',
  templateUrl: './rating-guest.component.html',
  styleUrls: ['./rating-guest.component.scss'],
})
export class RatingGuestComponent implements OnInit {
  public starRate: number;
  public ratingTab: number [] = [1, 2, 3, 4, 5];
  private coachId: string;
  private wasLoaded = false;

  constructor(private coachService: CoachAccountService,
              private store: Store<Reducers>,
              private toastGenerator: ToastGeneratorService) { }

  ngOnInit() {
    this.store.pipe(select('profile')).subscribe((state: storeState.ProfileState) => {
      this.coachId = state.profileId;
      state.ratedTrainers.forEach(ratedTrainer => {
        if (ratedTrainer.trainer === this.coachId as any && !this.wasLoaded) {
          this.starRate = ratedTrainer.rate;
        }
        this.wasLoaded = true;
      });
    });
  }

  public starRated(star: number) {
    this.starRate = star;
  }

  public rateTrainer() {
    this.coachService.rateCoach(this.starRate, this.coachId).subscribe((ratingData: any) => {
      this.store.dispatch(actions.profileAction.loadRates({newRatesSum: ratingData.ratesSum, newRatesAmount: ratingData.ratesAmount}));
      this.toastGenerator.presentToast('Zapisano ocene trenera', 'success');
    }, err => {
      this.toastGenerator.presentToast('Nie udało się zapisać oceny trenera', 'danger');
    });
  }

}
