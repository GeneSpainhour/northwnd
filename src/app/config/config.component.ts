
import {Component, OnInit} from '@angular/core';

import { ConfigService, ConfigItem } from "./config.service"
import {Observable} from 'rxjs/Observable'

interface ISelectList {
    value: string;
    text: string
}

@Component({

    selector: 'config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

    constructor(private configSvc: ConfigService) {

    }

    private configItems$: Observable<ConfigItem[]>
    private configItems: ConfigItem[] = [];
    private _errorMessages: string[];
    private _infoMessages: any[];

    configkeys(): string[] {
        return Object.keys(this.configItems);
    }

    useJson: boolean = false;
    private _rdy: boolean = false;

    ngOnInit() {
        setTimeout(() => { this.init() }, 500);
        
    }

    private init(): void {
        let config$ = this.configSvc.configItem$

        config$.subscribe(items => {
            this.configItems = items
            this._rdy = this.configItems != null 
        })
       
        // .subscribe(
        //     rdy => {
        //         if (rdy) {
        //             this.onSetRdy();
        //         } else {
        //             this.onClearRdy();
        //         }
        //     },
        //     error => { this.addErrorMsg(`init: error  ${error}`); }
        // );
    }

    private addErrorMsg(msg: string): void {
        this._errorMessages.push(msg);
    }

    private clearErrors(): void {
        this._errorMessages = [];
    }

    private onSetRdy(): void {
        if (!this._rdy) { // transitioning false => true
            console.log("onSetRdy");
            this.configItems$ = this.configSvc.configItem$;
            this.configItems = this.configSvc.configItems;
            this._rdy = true;
        }
    }

    private onClearRdy(): void {
        if (this._rdy) { // transitioning true => false
            console.log("onClearRdy");
            this.configItems$ = null;
            //this.configItems = this.configSvc.values;
            this._rdy = false;
        }
    }

}
   
