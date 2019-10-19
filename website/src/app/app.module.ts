import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmailConfirmComponent } from '../components/email-confirm/email-confirm.component';
import { PassChangeComponent } from '../components/pass-change/pass-change.component';
import { Routes , RouterModule, Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {EmailService} from '../components/email-confirm/email.service';

@NgModule({
  declarations: [
    AppComponent,
    EmailConfirmComponent,
    PassChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
  ],
  providers: [EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
