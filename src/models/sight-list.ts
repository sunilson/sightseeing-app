import { TranslateService } from '@ngx-translate/core';
import { Location } from './location';
import { Sight } from './sight';

export class SightList {

    constructor(public name: string, public id?: string, public creationDate?: number, public sights?: Sight[], public center?: Location) {
        this.id = new Date().getUTCMilliseconds().toString();
        this.creationDate = new Date().getTime();
    }

    addSight = (sight: Sight) => this.sights.push(sight);

    getFormattedDate(): string {
        let temp = new Date(this.creationDate);
        return (temp.getDate() < 10 ? "0" + temp.getDate() : temp.getDate()) + "." + (temp.getMonth() < 10 ? "0" + temp.getMonth() : temp.getMonth()) + "." + temp.getFullYear();
    }

    clear() {
        this.creationDate = new Date().getTime()
        this.sights = []
    }

    removeSight = (sight: Sight) => this.sights.splice(this.sights.indexOf(sight), 1)

}