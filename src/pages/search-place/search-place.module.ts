import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPlacePage } from './search-place';


@NgModule({
  declarations: [
    SearchPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPlacePage),
    AgmCoreModule,
    TranslateModule.forChild()
  ],
  exports: [
    AgmCoreModule
  ]
})
export class SearchPlacePageModule { }
