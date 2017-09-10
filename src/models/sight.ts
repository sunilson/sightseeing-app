import { Location } from './location';
export class Sight {
    constructor(public name: string,
        public thumbnail: string,
        public picture: string,
        public rating: number,
        public address: string,
        public place_id: string,
        public location: Location) {
        if (!thumbnail) {
            this.thumbnail = "assets/img/placeholder_100.jpg";
        }

        if (!picture) {
            this.picture = "assets/img/placeholder_big.jpg"
        }
    }
}