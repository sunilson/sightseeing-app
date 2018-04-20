import { Location } from './../models/location';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SelectedLocationService {

    private subject = new Subject<Location>();

    constructor() { }

    changeLocation = (location: Location) => this.subject.next(location)

    getLocation = (): Observable<Location> => this.subject.asObservable()
}