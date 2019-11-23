import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { ChatComponent } from '../chat.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  {path: '', component: ChatComponent}
];

@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    SharedModule,
  ]
})
export class ChatModule { }
