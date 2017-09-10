import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

export interface IObservableDataStore<T> {
    items: T[]
}

export class observableCollection<T>{
    private subject: BehaviorSubject<T[]>;
    private dataStore: IObservableDataStore<T>;
    private errorSubject: BehaviorSubject<string[]>;

    constructor(items?:T[]) {
        this.subject = new BehaviorSubject<T[]>([]);
        this.dataStore = { items: items };
    }

    public next(items: T[]):void {
        this.dataStore.items = items;

        this.subject.next(Object.assign({}, this.dataStore).items);
    }

    public get items(): Observable<T[]> {
        return this.subject.asObservable();
    }

    public get errors(): Observable<string[]> {
        return this.errorSubject.asObservable();
    }
}