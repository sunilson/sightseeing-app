import { SelectedLocationService } from './../../services/selected-location';
import { Location } from './../../models/location';
import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';

/**
 * Generated class for the SearchPlacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-search-place',
  templateUrl: 'search-place.html',
})
export class SearchPlacePage {

  placesService;
  geoCoder;
  searching: boolean = false;
  result = {};
  objectKeys = Object.keys;
  @ViewChild("searchBar") searchBar;

  constructor(private selectedLocationService: SelectedLocationService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _mapsAPILoader: MapsAPILoader,
    private changeDetector: ChangeDetectorRef) {
  }

  ionViewDidLoad() {
    this._mapsAPILoader.load().then(() => {
      this.placesService = new google.maps.places.AutocompleteService();
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  ionViewDidEnter = () => setTimeout(() => this.searchBar.setFocus(), 150)

  onInput(event) {
    if (this.placesService) {
      if (event.target.value && event.target.value.length > 0) {
        this.searching = true;
        this.placesService.getPlacePredictions({ input: event.target.value }, (result) => {
          console.log(result);
          this.result = result;
          this.searching = false;
          this.changeDetector.detectChanges();
        });
      } else this.searching = false;
    }
  }

  predictionClicked(item) {
    this.geoCoder.geocode({ "placeId": this.result[item].place_id }, (result) => {
      this.selectedLocationService.changeLocation(new Location(result[0].geometry.location.lat(), result[0].geometry.location.lng()));
    });
    this.navCtrl.pop();
    console.log(this.result[item]);
  }

}
