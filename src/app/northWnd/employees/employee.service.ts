import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/observable/throw'

import { IAction, ActionDispatcher, IActionReducer } from '../../util/state/actionDispatcher'
import { NotifierService } from '../../notifier/notifier.service'


import * as ax from './state/empActions'


import { ConfigService, ConfigItem } from '../../config/config.service'
import { EntityStateService } from '../../util/state/entityStateService'
import { Employee } from './employee'
const northwnd = "northwnd"
const key = 'employee'
const urlSuffix = "/api/employee"

@Injectable()
export class EmployeeService extends EntityStateService<Employee> {



    constructor(
        dispatcher: ActionDispatcher
        , notifierSvc: NotifierService
        , private http: Http
        , private configSvc: ConfigService
    ) {
        super(dispatcher, notifierSvc, key, ax.types)
        console.log("EmployeeStateService constructing")
    }

    private get siteUrl(): string {
        console.log("siteUrl:", this.configSvc.value(northwnd) + urlSuffix)
        return this.configSvc.value(northwnd) + urlSuffix
    }

    // subscribe to entity lists stream
    public get item$(): Observable<Employee[]> {

        let it = this.state$.map(s => s.items)   // ok, I had to mod the state to include selectedItems
        return it
    }

    // subscribe to the selected entity stream
    public get selectedItem$(): Observable<Employee> {
        return this.state$.map(s => s.selectedItem)
    }

    // I had to override this method here to keep from mixing the entity specific action info
    // with the more generic state info
    // If you don't overrde, you won't dispatch any actions
    protected rxAction(action: IAction): void {
        let theAction: IActionReducer<Employee> = ax.actionFactory(action)
        this.dispatchDirect(theAction)
    }

    public getItems(): void {
        this.dispatch(ax.FillAction.create())
        console.log("employee.service: getItems")
        // this code is used to get the data from the server
        // let config$ = this.configSvc.configItem$  

        // let emp$ = this.http.get(this.siteUrl)
        //     .map(resp => resp.json())

        // config$.concatMap(() => emp$)

        // config$.subscribe()

        // emp$.subscribe(
        //     items => this.rxItems(items),
        //     error => this.rxError(error)
        // )

        // we have some mock data for the demo, so
        let items : Employee[] = Employee.employees

        this.rxItems (items)

    }


    // edit implementation: but this is not the redux implementation
    // we need to send an action to the state processor
    // clients should get their selectedValues from the state.selectedItem observable
    private _selectedEmployeeId: number = 0

    public get selectedEmployeeId(): number {
        return this._selectedEmployeeId
    }

    private _selectedEmployee: Employee = null

    public get selectedEmployee(): Employee {
        return this._selectedEmployee
    }

    // this is our current selection implementation: just create a service property
    // however, using redo, we're going to let the state manage the selectedItem
    public set selectedEmployeeId(value: number) {
        this._selectedEmployeeId = value

        this._selectedEmployee = this.getState().items.find(e => e.employeeID == value) // get employee object

        this.dispatch(ax.SelAddAction.create(this._selectedEmployee))
    }


    // So, here it is. 
    // Technically, we could this.stateSubject.next (items) right here and everything
    // would work fine. The stateSubject would present the new state to all subscribers.
    // On the other hand, we could send a filled msg/action. The idea of a clean separation
    // between the filling state and the filled state makes me happy
    //
    // So the getItems method sends a fillAction to state before sending the request.
    // This method pulls the new items out of the http stream.
    // Then it dispatches a filledAction payload = [...items]
    private rxItems(items: Employee[]): void {

        this.dispatch(ax.FilledAction.create(items))
    }


    // add amd update without a problem
    // the after actions may be a problem. Our ui policy refreshes the list after
    // additions or updates. 
    // Raises a possible timing point if the add action comes after the filled. The
    // new item will be duplicated
    public add(item: Employee): void {
        let url: string = `${this.siteUrl}/${urlSuffix}`
        this.http.post(url, item)
            .map(resp => resp.json())
            .subscribe(
            item => this.rxItem(ax.AddAction.create(item))
            , err => this.rxError(err)
            )
    }


    private rxItem(item: IAction): void {
        this.dispatch(item)
    }



    public update(item: Employee): void {
        let url: string = `${this.siteUrl}/${urlSuffix}/${item.employeeID}`
        this.http.put(url, item)
            .map(resp => resp.json())
            .subscribe(
            item => this.rxItem(ax.EditAction.create(item))
            , err => this.rxError(err)
            )
    }
}  