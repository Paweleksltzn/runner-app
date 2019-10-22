import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.scss'],
})
export class NormalUserComponent implements OnInit {
  public profileDescription: string;
  public userName: string;
  public userSurname: string;
  public previewedTrainings = [
    {name: 'Training 1', exercises: 3, reps: 20, author: 'KFD', id: 0},
    {name: 'Training 2', exercises: 3, reps: 20, author: 'KFD', id: 1},
    {name: 'Training 3', exercises: 3, reps: 20, author: 'KFD', id: 2},
    {name: 'ETraining 4', exercises: 3, reps: 20, author: 'KFD', id: 3},
    {name: 'Pochodna', exercises: 3, reps: 20, author: 'KFD', id: 4},
    {name: 'funkcji', exercises: 3, reps: 20, author: 'KFD', id: 5},
    {name: 'x^3', exercises: 3, reps: 20, author: 'KFD', id: 6},
  ];
  constructor() { }

  ngOnInit() {
    this.userName = "Jacek"
    this.userSurname = "Soplica"
    this.profileDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum congue facilisis.';
  }

}
