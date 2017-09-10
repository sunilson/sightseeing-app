import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightListPage } from './sight-list';

@NgModule({
  declarations: [
    SightListPage,
  ],
  imports: [
    IonicPageModule.forChild(SightListPage),
    TranslateModule.forChild()
  ],
})
export class SightListPageModule { }
