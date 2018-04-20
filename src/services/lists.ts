import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SightList } from './../models/sight-list';
import { Injectable } from '@angular/core';

@Injectable()
export class ListService {

    lists: SightList[] = [];

    constructor(private storage: Storage, private translateService: TranslateService) { }

    /**
     * Add a new list and store it to the local storage
     * 
     * @param list 
     */
    addList(list: SightList) {
        this.lists.push(list);
        this.storage.set("lists", JSON.stringify(this.lists));
    }

    /**
     * Replace a list
     * 
     * @param list 
     */
    changeList(list: SightList) {
        for (let i = 0; i < this.lists.length; i++) {
            if (this.lists[i].id == list.id) {
                this.lists[i] = list;
            }
        }
    }

    /**
     * Returns a saved list or null
     * 
     * @param id The id of the list
     */
    getList(id: string): SightList {
        for (let i = 0; i < this.lists.length; i++) {
            if (this.lists[i].id == id) {
                return this.lists[i];
            }
        }
        return null;
    }

    removeList(id: string) {
        for (let i = 0; i < this.lists.length; i++) {
            if (this.lists[i].id == id) {
                this.lists.splice(i, 1);
                this.storage.set("lists", JSON.stringify(this.lists));
                return;
            }
        }
    }

    /**
     * Retrieve lists from local storage
     */
    initialize() {
        this.storage.get("lists").then(lists => {
            if (lists) JSON.parse(lists).
                forEach(element => this.lists.push(
                    new SightList(element.name,
                        element.id,
                        element.creationDate,
                        element.sights,
                        element.center)));
        });
    }
}