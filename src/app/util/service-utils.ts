import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

export class RdySynch {

    constructor() { }

    private _rdy: boolean = false;

    private _rdySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public get rdy(): Observable<boolean> {
        return this._rdySubject.asObservable();
    }

    protected setRdy(): void {
        this.nextRdy(true);
    }

    private clearRdy(): void {
        this.nextRdy(false);
    }

    public reset(): void {
        this.clearRdy();
    }

    public get rdyValue(): boolean {
        return this._rdy;
    }

    protected nextRdy(bValue: boolean) : boolean{
        this._rdy = bValue;
        this._rdySubject.next(this._rdy);
        return this._rdy;
    }


}

declare interface IEntityItems<T> { items: T[] };


 export class EntitySynch<T> extends RdySynch {
 
    constructor() {
        super();
    }

    // error stream impl
    private _errors: string[] = [];

    private _errorSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    public get errors(): Observable<string[]> {
        return this._errorSubject.asObservable();
    }

    protected nextError(error: string): void {
        if (error) {
            this._errors.push(error);
            this._errorSubject.next(Object.assign({}, this._errors));
        }
    }

    // item stream impl
    private _itemStore: IEntityItems<T> = { items: [] };

    private _itemSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);


    public get items(): T[] {
        return this._itemStore.items;
    }

    public get items$(): Observable<T[]> {
        return this._itemSubject.asObservable();
    }

    protected add(item: T): void {
        this._itemStore.items.push(item);
        this._itemSubject.next(Object.assign([], this._itemStore).items);
    }

    public next(items: T[]): void {
        this._itemStore.items = Object.assign([], items);

        this._itemSubject.next(Object.assign([], this._itemStore).items);

    }
}
