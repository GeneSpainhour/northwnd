import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
//import * as a from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

import { NotifierMessage, ThrobberMessage } from './notifierMessage'

import { NotifierService } from './notifier.service'


export class NotifyingComponent {

    constructor(
        protected notifierSvc: NotifierService
    ) {
        this.notifierSvc.infoChannel.subscribe(
            info => this.addInfoMsg(info),
            error => this.addErrorMessage([error])
        )

        this.notifierSvc.errorChannel
            .filter( msgs => msgs && msgs.every(msg=> msg.trim().length > 0))
            .subscribe(
                info => this.addErrorMessage(info),
                error => this.addErrorMessage([error])
            )

		this.notifierSvc.throbberChannel.subscribe(bValue => this.addThrobberMessage(bValue))
      
    }

    private _active: boolean = true

    public get showNotifications(): boolean {
        return this._active
    }

    public set showNotifications(value: boolean) {
        this._active = value
    }

    private _notifierSubject: BehaviorSubject<NotifierMessage>
    = new BehaviorSubject<NotifierMessage>(NotifierMessage.create())

    protected get notifierMessage$(): Observable<NotifierMessage> {
        return this._notifierSubject.asObservable()
    }

    protected addInfoMsg(msg: string[]): void {
        if (this._active && msg && msg.length) {
            this._notifierSubject.next(NotifierMessage.create(true, msg))
        }
    }

    protected addErrorMessage(msg: string[]): void {
        if (this._active && msg && msg.length) {
            this._notifierSubject.next(NotifierMessage.create(false, msg))
        }
	}

	  // watch for two empties
	private _throbberSubject: BehaviorSubject<ThrobberMessage>
	= new BehaviorSubject<ThrobberMessage>(ThrobberMessage.create())

	protected get throbber$(): Observable<ThrobberMessage> {
		return this._throbberSubject.asObservable()
	}

	protected addThrobberMessage(msg: ThrobberMessage): void {
		if (this._active) {
			this._throbberSubject.next(msg)
		}
	}
}
