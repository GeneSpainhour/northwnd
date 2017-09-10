
import { IAction, ActionDispatcher } from '../state/actionDispatcher'


import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/do' 
import  'rxjs/add/operator/catch' 
import  'rxjs/add/operator/map' 
import  'rxjs/add/operator/publish'
import  'rxjs/add/operator/mergeMap' 
import  'rxjs/add/observable/throw' 
import  'rxjs/add/observable/fromEvent' 
import { SubscriptionStore } from '../../util/subscriptionStore'
import { LocatorEntry, StateLocator } from './stateLocator'

export interface IAppState<T> {
    items: T[],
    selectedItem : T
}

export class AppState<T> implements IAppState<T>{
    constructor (
        public items: T[],
        public selectedItem : T
    ){}

    public static create<T>(items?: T[], selectedItem?: T): AppState<T>{
        return new AppState<T>(items, selectedItem)
    }
}

export class State<T> {
    constructor(
        private key: string
        , private dispatcher: ActionDispatcher
        , private types: string[]) {    // this is the array of action.types supported

        this.init()            
    }

    protected init(): void {
        this.subStore.add(
            this.dispatcher.action$
                .filter(a => a != null && this.types.includes(a.type))    // we filter our actions to only those action.types included
                .subscribe(
                    (action: IAction) => this.rxAction(action),
                    error => this.rxError(error)
                )
        )

      //  StateLocator.register (LocatorEntry.create (this.key, this.types, this.offerState()))
    }

    public locate (action: string): LocatorEntry [] {
        
        let items : LocatorEntry[] = StateLocator.locate(action)
        return items
    }

    private offerState(): any {
        let o$ = this.state$.publish()
        o$.connect()
        return o$
    }


    // store subscriptions for unsubscribing on destroy
    private subStore : SubscriptionStore = new SubscriptionStore ()
    
    // overridden: the action processing method
    protected rxAction (action : IAction): void {}

    // overridden: the error processing method
    protected rxError ( error : any): void {}

    // state.dispatch method. delegates action message to the actionDispatcher
    // from which all states recieve their actions
    public dispatch (action : IAction): void {
      
        this.dispatcher.dispatch (action)
    }

    // the action$. Subscribe and get a stream of actions
    public get action$(): Observable<IAction> {
        return this.dispatcher.action$
    }
    
    // states provide an observable stream of states
    private stateSubject: BehaviorSubject<IAppState<T>> = new BehaviorSubject<IAppState<T>>(null)

    // using async pipe is the way to go most of the time. 
    // private doDad$: Observable<DoDad[]> = this.doDadSvc.doDad$   // boom
    // you'll have state transitions to perform when the data comes in:
    //  this.doDad$.subscribe ( doDads => this.rxDoDads(doDads), err => this.rxDoDadError(err))
    // perform your state transitions in the rxDoDad method
    // perform error transitions in , I usually call it rxError 
    
    // public getter for client subscription
    public get state$(): Observable<IAppState<T>> {
        return this.stateSubject.asObservable()
    }

    // adds a new msg to the stream
    // saves current state and notifies
    public nextState(state: IAppState<T>): void {
        this.currentState = {items: state.items? [...state.items]: [], selectedItem: state.selectedItem}
        console.log(`${this.key} nextState `, this.currentState)
        this.stateSubject.next(this.currentState)
    }

    // this is our state variable
    protected currentState : IAppState<T> = {items: [], selectedItem: null}

    // all states have a getState method, 
    // no one will violate that law, it's tradition
    public getState(): IAppState<T>{
        return this.currentState
    }

    public ngOnDestroy(): void {
        console.log ("state destroying")
        this.subStore.unsubscribe()
    }

    protected errorSubject : BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

    public get error$() : Observable<string[]> {
        return this.errorSubject.asObservable()
    }
    
    public addError (err : string[]): void {
        this.errorSubject.next(err)
    }
}