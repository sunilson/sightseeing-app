import { Utilities } from './../utilities/utilities';
export class PlaceSettings {

    constructor(public radius: number, public openOnly: boolean) {
        this.radius = Utilities.clamp(radius, 0, 50);
    }
}