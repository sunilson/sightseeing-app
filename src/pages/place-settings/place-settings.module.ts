import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceSettingsPage } from './place-settings';

@NgModule({
  declarations: [
    PlaceSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceSettingsPage),
    TranslateModule.forChild()
  ],
})
export class PlaceSettingsPageModule { }
