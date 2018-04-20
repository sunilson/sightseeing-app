import { TranslateService } from '@ngx-translate/core';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { MapsAPILoader } from '@agm/core';
import { Sight } from './../../models/sight';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the SightPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-sight',
  templateUrl: 'sight.html',
})
export class SightPage {

  sight: Sight;
  loading: boolean = true;
  detailledSight: any;
  openingHours: string;
  placesService;
  @ViewChild("map") map;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _mapsAPILoader: MapsAPILoader,
    private callNumber: CallNumber,
    private alertCtrl: AlertController,
    private launchNavigator: LaunchNavigator,
    private changeDetectr: ChangeDetectorRef,
    private translateService: TranslateService
  ) {
  }

  ionViewDidLoad() {
    this.sight = this.navParams.get("sight");
    this._mapsAPILoader.load().then(() => {
      this.placesService = new google.maps.places.PlacesService(this.map.nativeElement);
      this.placesService.getDetails({ placeId: this.sight.place_id }, result => {
        this.loading = false;
        this.detailledSight = result;
        if (this.detailledSight.opening_hours) {
          this.openingHours = (this.detailledSight.opening_hours.open_now ? "Open" : "Closed") + " - " + this.detailledSight.opening_hours.weekday_text[new Date().getDay() - 1];
        } else {
          this.openingHours = "-";
        }
        this.changeDetectr.detectChanges();
      });
    });
  }

  openWebsite = () => { if (this.detailledSight.website) window.open(this.detailledSight.website) }

  call = () => { if (this.detailledSight.international_phone_number) this.callNumber.callNumber(this.detailledSight.international_phone_number, true) }

  openMap = () => this.launchNavigator.navigate([this.sight.location.lat, this.sight.location.long], {
    app: this.launchNavigator.APP.GOOGLE_MAPS
  });

  showOpenHours() {
    this.alertCtrl.create({
      title: this.translateService.instant(["opening_hours"])["opening_hours"],
      subTitle: this.openingHours,
      buttons: [this.translateService.instant(["dismiss"])["dismiss"]]
    }).present();
  }
}
