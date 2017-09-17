import { TranslateService } from '@ngx-translate/core';
import { ListService } from './../../services/lists';
import { SettingsService } from './../../services/settings';
import { SightList } from './../../models/sight-list';
import { Sight } from './../../models/sight';
import { MapsAPILoader } from '@agm/core';
import { Location } from './../../models/location';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';

/**
 * Generated class for the SightListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-sight-list',
  templateUrl: 'sight-list.html',
})
export class SightListPage {

  location: Location;
  placesService;
  loading: boolean = true;
  sightList: SightList;

  @ViewChild("map") map;

  constructor(private listService: ListService,
    private settingsService: SettingsService,
    private changeDetector: ChangeDetectorRef, private _mapsAPILoader: MapsAPILoader,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private translateService: TranslateService,
    private modalCtrl: ModalController
  ) {
  }

  delete(event, sight: Sight) {
    event.stopPropagation();
    this.translateService.get(["delete_sight", "cancel", "confirm"]).subscribe(values => {
      this.alertCtrl.create({
        title: values["delete_sight"],
        buttons: [
          {
            text: values["cancel"],
            role: 'cancel',
            handler: data => {
            }
          },
          {
            text: values["confirm"],
            handler: data => {
              this.sightList.removeSight(sight);
              this.changeDetector.detectChanges();
            }
          }
        ]
      }).present();
    });
  }

  deleteList() {
    this.translateService.get(["delete_list", "cancel", "confirm"]).subscribe(values => {
      this.alertCtrl.create({
        title: values["delete_list"],
        buttons: [
          {
            text: values["cancel"],
            role: 'cancel',
            handler: data => {
            }
          },
          {
            text: values["confirm"],
            handler: data => {
              this.listService.removeList(this.sightList.id);
              this.navCtrl.pop();
            }
          }
        ]
      }).present();
    });
  }

  ionViewWillEnter() {
    this.translateService.get(["keyword", "unsaved_list"]).subscribe(result => {
      this.sightList = new SightList(result["unsaved_list"]);
      if (this.navParams.get("location")) {
        this.location = this.navParams.get("location");
        this._mapsAPILoader.load().then(() => {
          this.placesService = new google.maps.places.PlacesService(this.map.nativeElement);
          this.placesService.nearbySearch({
            "location": new google.maps.LatLng(this.location.lat, this.location.long),
            "keyword": result["keyword"],
            "radius": this.navParams.get("radius") * 1000,
            "openNow": this.navParams.get("openOnly"),
            "type": "point_of_interest"
          }, (result) => {
            this.loading = false;
            this.sightList.clear();
            this.sightList.center = this.location;
            for (let sight of result) {
              console.log(sight);
              this.sightList.addSight(new Sight(sight.name,
                typeof sight.photos !== "undefined" ? sight.photos[0].getUrl({ "maxWidth": 100, "maxHeight": 100 }) : '',
                typeof sight.photos !== "undefined" ? sight.photos[0].getUrl({ "maxWidth": 1000, "maxHeight": 1000 }) : '',
                sight.rating, sight.vicinity,
                sight.place_id,
                new Location(sight.geometry.location.lat(), sight.geometry.location.lng())));
            }
            this.changeDetector.detectChanges();
          });
        });
      } else {
        this.sightList = this.listService.getList(this.navParams.get("id"));
        this.loading = false;
        console.log(this.sightList);
      }
    });
  }

  openMap() {
    this.modalCtrl.create("SightMapPage", {
      "sightList": this.sightList
    }).present();
  }

  openSight(event, sight: Sight) {
    event.stopPropagation();
    this.modalCtrl.create("SightPage", {
      "sight": sight
    }).present();
  }

  done() {
    if (!this.navParams.get("id")) {
      this.alertCtrl.create({
        title: "Choose a name",
        inputs: [
          {
            placeholder: "Enter name",
            name: "name"
          }
        ],
        buttons:
        [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
            }
          },
          {
            text: 'Save',
            handler: data => {
              this.sightList.name = data.name;
              this.listService.addList(this.sightList);
              this.navCtrl.pop();
            }
          }
        ]
      }).present();
    } else {
      this.listService.changeList(this.sightList);
      this.navCtrl.pop();
    }
  }
}
