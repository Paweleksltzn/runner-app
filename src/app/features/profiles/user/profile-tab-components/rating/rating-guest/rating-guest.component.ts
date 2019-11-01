import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-guest',
  templateUrl: './rating-guest.component.html',
  styleUrls: ['./rating-guest.component.scss'],
})
export class RatingGuestComponent implements OnInit {
  public starRate: number;
  constructor() { }

  ngOnInit() {}

  starRated(star: number) {
    this.starRate = star;
  }
}
