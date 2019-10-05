import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-training-type',
  templateUrl: './training-type.component.html',
  styleUrls: ['./training-type.component.scss'],
})
export class TrainingTypeComponent implements OnInit {
  public sportDyscypline: any = 'none' ;
  public selectedOption: any = 'none';
  public trainingGoalsSelects = [
    {goalValue: 'none', goalText: 'Brak'},
    {goalValue: 'kcal', goalText: 'Kalorie do spalenia'},
    {goalValue: 'km', goalText: 'Kilometry do przebiegnięcia'},
    {goalValue: 'min', goalText: 'Czas do pokonania'},
  ];
  OptionsFilter(event: any){
    this.selectedOption = event.target.value;
  }

  constructor(public actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {}


  async activityMenu() { 
    const actSheet = await this.actionSheetCtrl.create({
      header: 'Dyscypliny',
      buttons: [{
        text: 'Bieg',
        icon: 'walk',
        handler: () => {
          this.sportDyscypline = 'run';
          console.log(this.sportDyscypline);
        }
      }, 
      {
        text: 'Kolarstwo',
        icon: 'bicycle',
        handler: () => {
          this.sportDyscypline = 'bike';
          console.log(this.sportDyscypline);
        }
      },]
    });
    await actSheet.present();
  }

}
