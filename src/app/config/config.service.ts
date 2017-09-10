


import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as a from 'rxjs/add/operator/do';
import * as b from 'rxjs/add/operator/catch';
import * as c from 'rxjs/add/operator/map';

import { EntityStore } from '../util/entityStore'
// import * as util from "../util/service-utils";

const blob = require ('../../api/config/config.json')

export interface ConfigItem { name: string, value: string };

@Injectable()
export class ConfigService extends EntityStore<ConfigItem> {
    private _wellKnownUrl = "api/config/config.json";

    constructor() {
        super();

        console.log("config constructing");

        this.next(blob.configItems)
    }

    public value(name: string): string {
        let retValue: string = ""
        let item = this._itemStore.find(item => item.name == name)
        if (item){
            retValue = item.value
        }
        return retValue
    }

    public get configItems(): ConfigItem[]{
        return this._itemStore
    }

    public get configItem$(): Observable<ConfigItem[]>{
        return this.item$
    }

   

}