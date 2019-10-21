import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from 'src/app/core/auth/routing/auth.routing';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { JwtInterceptor } from 'src/app/core/auth/interceptors/tokenInterceptor';
import { ErrorStatementComponent } from './error-statement/error-statement.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forFeature('auth', authReducer)
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ErrorStatementComponent
  ],
  providers: [
    NativeStorage,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class AuthModule {}
