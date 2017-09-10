
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { ErrorModel } from '../../models/errorModel'

import { NotifierService } from '../../notifier/notifier.service'

// import * as ax from './empActions'
// import { T } from '../employee'

import { IAction, ActionDispatcher, IActionReducer } from './actionDispatcher'
import { State, AppState, IAppState } from './state'

const key = "employee"

export interface IActionFactory<T> {
    actionFactory(action: IAction) : IActionReducer<T>
}

export interface IStateActionContext<T> {
    types: string[],
    actionFactory: (action: IAction) => IActionReducer<T>,
    key: string
}

@Injectable()
export class EntityStateService<T> extends State<T>{
    
    constructor(
        dispatcher: ActionDispatcher
        , private notifierSvc: NotifierService
        , key: string
        , types: string[]
        
    ) {
        super(key, dispatcher, types)
    }

    public reduce(state: IAppState<T>, action: IActionReducer<T>):IAppState<T> {
        
        let nextState: IAppState<T> = action.reduce(state) 
        return nextState
    }

    // If you don't override this in the derived class, you won't see any
    // actions processing. 
    // trying to weave in the action stuff was icky.
    // I overrode the state<T> method in the derived class
    protected rxAction(action: IAction): void {
        // let theAction: IActionReducer<T> = this.context.actionFactory(action)
        // this.dispatchDirect(theAction)
    }

    // this version of dispatch is used when not using observable actions
    public dispatchDirect(action: IActionReducer<T>): void {
        let state:IAppState<T> = this.reduce(this.currentState, action)
       
        this.nextState(state)
    }

    protected rxError(err: any): void {
        let msg: ErrorModel = ErrorModel.fromHttpError(err)
        this.notifierSvc.addErrorMsg([JSON.stringify(msg)])
    }

}