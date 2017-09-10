import { PlaceSettings } from './../models/place-settings';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable()
export class SettingsService {

    private settings: PlaceSettings = new PlaceSettings(5, false);

    constructor(private storage: Storage) {

    }

    initialize() {
        this.storage.get("placeSettings").then(result => {
            if (result) {
                this.settings = result;
            }
        });
    }

    getRadius() {
        return this.settings.radius;
    }

    getOpenOnly() {
        return this.settings.openOnly;
    }

    changeSettings(options: PlaceSettings) {
        this.storage.set("placeSettings", options);
        this.settings = options;
    }
}