import { ListService } from './../../services/lists';
import { SettingsService } from './../../services/settings';
import { SelectedLocationService } from './../../services/selected-location';
import { Location } from './../../models/location';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the SelectPlacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-place',
  templateUrl: 'select-place.html',
})
export class SelectPlacePage implements OnInit {

  location: Location = new Location(51.678418, 7.809007);
  circleClickable: boolean = false;
  marker: Location;

  constructor(public listService: ListService,
    public settingsService: SettingsService,
    private toastController: ToastController,
    private changeDetector: ChangeDetectorRef,
    private geoLocation: Geolocation,
    private selectedLocationService: SelectedLocationService,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.settingsService.initialize();
  }

  ionViewDidLoad() {
    this.selectedLocationService.getLocation().subscribe(location => {
      this.location = location;
      this.marker = location;
    });
    this.locateMe();
  }

  locateMe() {
    this.geoLocation.getCurrentPosition().then(result => {
      let temp = new Location(result.coords.latitude, result.coords.longitude);
      this.location = temp;
      this.marker = temp;
    }).catch(error => {
      this.toastController.create({
        message: "Error getting your position!",
        duration: 3000,
        position: "bottom"
      }).present();
    });
  }

  done() {
    this.navCtrl.push("SightListPage", {
      location: this.marker,
      radius: this.settingsService.getRadius(),
      openOnly: this.settingsService.getOpenOnly()
    });
  }

  toggleSearch() {
    this.modalCtrl.create("SearchPlacePage").present();
  }

  toggleSettings() {
    this.modalCtrl.create("PlaceSettingsPage").present();
  }

  mapClicked(event) {
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }
}
