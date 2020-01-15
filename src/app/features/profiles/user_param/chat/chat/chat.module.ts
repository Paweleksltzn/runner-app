import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { ChatComponent } from '../chat.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConversationComponent } from '../conversation/conversation.component';
import { StoreModule } from '@ngrx/store';
import { conversationReducer } from '../store/conversation.reducer';

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
    StoreModule.forFeature('conversations', conversationReducer)
  ],
  entryComponents: [ConversationComponent]
})
export class ChatModule { }
