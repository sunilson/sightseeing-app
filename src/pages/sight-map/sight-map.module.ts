import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightMapPage } from './sight-map';

@NgModule({
  declarations: [
    SightMapPage,
  ],
  imports: [
    IonicPageModule.forChild(SightMapPage),
    AgmCoreModule,
    TranslateModule.forChild()
  ],
})
export class SightMapPageModule { }
