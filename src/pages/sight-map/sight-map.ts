import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { SightList } from './../../models/sight-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Sight } from './../../models/sight';

/**
 * Generated class for the SightMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sight-map',
  templateUrl: 'sight-map.html',
})
export class SightMapPage {

  sightList: SightList;

  constructor(private translateSerivce: TranslateService, public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.sightList = this.navParams.get("sightList");
    console.log('ionViewDidLoad SightMapPage');
  }

  moreInfo(sight: Sight) {
    this.modalCtrl.create("SightPage", {
      "sight": sight
    }).present();
  }
}
