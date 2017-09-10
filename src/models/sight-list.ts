import { TranslateService } from '@ngx-translate/core';
import { Location } from './location';
import { Sight } from './sight';

export class SightList {

    public id: string;
    public center: Location;
    public creationDate: number;
    sights: Sight[] = [];

    constructor(public name: string) {
        this.id = new Date().getUTCMilliseconds().toString();
        this.creationDate = new Date().getTime();
    }

    initialize(name: string, id: string, creationDate: number, sights: Sight[], center: Location) {
        this.name = name;
        this.id = id;
        this.creationDate = creationDate;
        this.sights = sights;
    }

    addSight(sight: Sight) {
        this.sights.push(sight);
    }

    getFormattedDate(): string {
        let temp = new Date(this.creationDate);
        return (temp.getDate() < 10 ? "0" + temp.getDate() : temp.getDate()) + "." + (temp.getMonth() < 10 ? "0" + temp.getMonth() : temp.getMonth()) + "." + temp.getFullYear();
    }

    getSights(): Sight[] {
        return this.sights;
    }

    clear() {
        this.creationDate = new Date().getTime();
        this.sights = [];
    }

    removeSight(sight: Sight) {
        this.sights.splice(this.sights.indexOf(sight), 1);
        console.log(this.sights);
    }
}