import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { CallNumber } from '@ionic-native/call-number';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightPage } from './sight';
import { LaunchNavigator } from '@ionic-native/launch-navigator';


@NgModule({
  declarations: [
    SightPage,
  ],
  imports: [
    IonicPageModule.forChild(SightPage),
    AgmCoreModule,
    TranslateModule.forChild()
  ],
  providers: [
    CallNumber,
    LaunchNavigator
  ]
})
export class SightPageModule { }
