import { Injectable } from '@angular/core'


import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'


import { Observer } from 'rxjs/Observer'
import { ThrobberMessage, NotifierMessage } from './notifierMessage'

export {  ThrobberMessage, NotifierMessage }

@Injectable()
export class NotifierService {
    private static inst: number = 0

    constructor() {
        console.log("NotifierService.inst: " + ++NotifierService.inst)
    }

    private _infoChannel: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

    private _errorChannel: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

    public get infoChannel(): Observable<string[]> {
        return this._infoChannel.asObservable()
    }

    public get errorChannel(): Observable<string[]> {
        return this._errorChannel.asObservable()
    }

    public addInfoMsg(msg: string[]): void {
        this._infoChannel.next(msg)
    }

    public addErrorMsg(msg: string[]): void {
        this._errorChannel.next(msg)
	}

	private _throbberChannel: BehaviorSubject<ThrobberMessage> = new BehaviorSubject<ThrobberMessage>(ThrobberMessage.create())

	public get throbberChannel(): Observable<ThrobberMessage> {
		return this._throbberChannel.asObservable()
	}

	public setThrobber(msg: ThrobberMessage): void {
		console.log(`setting throbber value to {${msg.sender}, ${msg.showThrobber}}`)
		this._throbberChannel.next(msg)
	}
}