import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SightList } from './../models/sight-list';
import { Injectable } from '@angular/core';

@Injectable()
export class ListService {

    lists: SightList[] = [];

    constructor(private storage: Storage, private translateService: TranslateService) {

    }

    addList(list: SightList) {
        this.lists.push(list);
        this.storage.set("lists", JSON.stringify(this.lists));
    }

    changeList(list: SightList) {
        for (let i = 0; i < this.lists.length; i++) {
            if (this.lists[i].id == list.id) {
                this.lists[i] = list;
            }
        }
    }

    getList(id: string): SightList {
        for (let i = 0; i < this.lists.length; i++) {
            if (this.lists[i].id == id) {
                return this.lists[i];
            }
        }
        return null;
    }

    getLists() {
        return this.lists;
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

    initialize() {
        this.storage.get("lists").then(lists => {
            if (lists) {
                let temp = JSON.parse(lists);
                temp.forEach(element => {
                    this.translateService.get(["unsaved_list"]).subscribe(result => {
                        let tempList = new SightList(result["unsaved_list"]);
                        tempList.initialize(element.name, element.id, element.creationDate, element.sights, element.center);
                        this.lists.push(tempList);
                    });
                });
                console.log(this.lists);
            }
        });
    }
}