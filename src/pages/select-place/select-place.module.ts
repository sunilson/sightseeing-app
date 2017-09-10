import { TranslateModule } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPlacePage } from './select-place';

@NgModule({
  declarations: [
    SelectPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectPlacePage),
    AgmCoreModule,
    TranslateModule.forChild()
  ],
  exports: [
    AgmCoreModule
  ],
  providers: [
    Geolocation
  ]
})
export class SelectPlacePageModule { }
