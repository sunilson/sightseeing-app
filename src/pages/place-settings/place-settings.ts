import { PlaceSettings } from './../../models/place-settings';
import { SettingsService } from './../../services/settings';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlaceSettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-settings',
  templateUrl: 'place-settings.html',
})
export class PlaceSettingsPage {

  open: boolean = false;
  currentRadius: number = 10;


  constructor(public navCtrl: NavController, public navParams: NavParams, private settingsService: SettingsService) {
  }

  ionViewDidLoad() {
    this.currentRadius = this.settingsService.getRadius();
    this.open = this.settingsService.getOpenOnly();
  }

  radiusChange(event) {
    this.currentRadius = event.value;
  }

  openChange(event) {
    this.open = event.value;
  }

  save() {
    this.settingsService.changeSettings(new PlaceSettings(this.currentRadius, this.open));
    this.navCtrl.pop();
  }

  close() {
    this.navCtrl.pop();
  }
}
