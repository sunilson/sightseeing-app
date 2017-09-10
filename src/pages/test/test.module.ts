import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestPage } from './test';

@NgModule({
  declarations: [
    TestPage,
  ],
  imports: [
    IonicPageModule.forChild(TestPage),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBf50PB9hfNCGtK_p0q_A_TNfyvN9uyL_E"
    })
  ],
})
export class TestPageModule { }
