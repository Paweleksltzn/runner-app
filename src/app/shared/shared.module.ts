import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsNavComponent } from './components/tabs-nav/tabs-nav.component';

@NgModule({
  declarations: [TabsNavComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TabsNavComponent
  ]
})
export class SharedModule { }
