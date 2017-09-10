import { LanguageService } from './../services/language';
import { Storage } from '@ionic/storage';
import { SightList } from './../models/sight-list';
import { ListService } from './../services/lists';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "SelectPlacePage";

  @ViewChild("mycontent") nav: NavController;

  constructor(private languageService: LanguageService, private storage: Storage, public listService: ListService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.listService.initialize();
      this.languageService.initializeLanguage();
    });
  }

  openList(list: SightList) {
    this.nav.push("SightListPage", {
      "id": list.id
    })
  }
}

