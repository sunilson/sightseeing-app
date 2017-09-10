import { LanguageService } from './../services/language';
import { Http, HttpModule } from '@angular/http';
import { ListService } from './../services/lists';
import { SettingsService } from './../services/settings';
import { SelectedLocationService } from './../services/selected-location';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { createTranslateLoader } from "./translateLoader"

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBf50PB9hfNCGtK_p0q_A_TNfyvN9uyL_E",
      libraries: ['places']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SelectedLocationService,
    SettingsService,
    ListService,
    LanguageService
  ]
})
export class AppModule { }
