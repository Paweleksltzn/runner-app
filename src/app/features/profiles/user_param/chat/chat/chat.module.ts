import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { ChatComponent } from '../chat.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConversationComponent } from '../conversation/conversation.component';


const routes: Routes = [
  {path: '', component: ChatComponent}
];

@NgModule({
  declarations: [
    ChatComponent,
    ConversationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    SharedModule,
  ],
  entryComponents: [ConversationComponent]
})
export class ChatModule { }
