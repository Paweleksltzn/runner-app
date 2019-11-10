import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-guest',
  templateUrl: './rating-guest.component.html',
  styleUrls: ['./rating-guest.component.scss'],
})
export class RatingGuestComponent implements OnInit {
  public starRate: number;
  public ratingTab: number [] = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit() {}

  public starRated(star: number) {
    this.starRate = star;
  }
}
