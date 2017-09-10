import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { IAppState } from './state'

export interface IAction {
    type: string,
    payLoad?: any
}

export interface IActionReducer<T> extends IAction {
    type: string,
    payLoad?:any,
    reduce: (state: IAppState<T> ) => IAppState<T>
}

@Injectable()
export class ActionDispatcher{
    private _actionSubject : BehaviorSubject<IAction> = new BehaviorSubject<IAction>(null)

    public get action$():Observable<IAction>{
        return this._actionSubject.asObservable()
    }

    public dispatch(action: IAction): void {
      
        this._actionSubject.next (action)
    }

}