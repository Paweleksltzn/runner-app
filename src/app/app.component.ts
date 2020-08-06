import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/auth/services/auth.service';
import { TabsNavLink } from './shared/interfaces/tabsNavLink';
import { tabNavOptions } from './shared/components/tabs-nav/tabs-nav-options';
import { Plugins } from '@capacitor/core';
const { AdMob } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public tabLinks: TabsNavLink[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.tabLinks = tabNavOptions;
    this.initializeApp();
    AdMob.initialize('ca-app-pub-5176326537772909~2303840659');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.autoLogin();
    });
  }
}
