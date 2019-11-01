import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  public starRate: number;
  constructor() { }

  ngOnInit() {}

  starRated(star: number) {
    this.starRate = star;
    console.log(this.starRate);
  }
}
