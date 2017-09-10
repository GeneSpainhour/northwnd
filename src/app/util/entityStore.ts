import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


export class EntityStore<T>{
    constructor() {}
    

        // error stream impl
    private _errors: string[] = []

    private _errorSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

    public get error$(): Observable<string[]> {
        return this._errorSubject.asObservable()
    }

    protected nextError(errors: string[]): void {
        if (errors) {
            this._errors= errors
            this._errorSubject.next(Object.assign([], this._errors))
        }
    }

    // item stream impl
    protected _itemStore: T[] = []

    protected _itemSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([])


    public get items(): T[] {
        return this._itemStore
    }

    public get item$(): Observable<T[]> {
        return this._itemSubject.asObservable()
    }

    
    protected add(item: T): void {
        this._itemStore.push(item)
        this._itemSubject.next(Object.assign([], this._itemStore))
    }

    protected next(items: T[]): void {
        this._itemStore = Object.assign([], items)

        this._itemSubject.next(Object.assign([], this._itemStore))

    }

    protected clearErrors(): void {
        this._errors = []
        this._errorSubject.next(Object.assign([], this._errors))
    }

    protected clear(): void {
        this.clearErrors()

        this._itemStore = []

        this._itemSubject.next(Object.assign([], this._itemStore))
    }

}