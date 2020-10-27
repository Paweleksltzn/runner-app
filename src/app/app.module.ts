import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from 'src/app/core/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicImageLoader } from 'ionic-image-loader';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { StoreModule } from '@ngrx/store';
import { SocketModule } from './core/socket/socket.module';
import { NotificationsPageModule } from './features/notifications/notifications.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
const config: SocketIoConfig = { url: environment.srvAddress, options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
     BrowserModule,
     BrowserAnimationsModule,
     IonicModule.forRoot(),
     IonicImageLoader.forRoot(),
     AppRoutingModule,
     SharedModule, AuthModule,
     StoreModule.forRoot({}),
     SocketModule,
     NotificationsPageModule,
     SocketIoModule.forRoot(config)
  ],
  providers: [
    StatusBar,
    WebView,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
