import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import { EmployeeService } from './employee.service'
// import { EmployeeService } from './employeeState.service'
import { Employee }  from './employee'
import { ListResult }  from './list/employee-list.component'
import { ResultModel } from '../../models/resultModel'
import { NotifierService } from '../../notifier/notifier.service'
import { ActionDispatcher } from '../../util/state/actionDispatcher'

const vuList = "list"
const vuEdit = "edit"
const vuDelete = "delete"
const vuDetail = "detail"
const vuAdd = "add"



@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    providers: [
        EmployeeService
        , ActionDispatcher
    ]
})
export class EmployeesComponent implements OnInit, OnDestroy{
    constructor (
        // private empSvc : EmployeeService 
        private empSvc : EmployeeService 
        , private notifierSvc : NotifierService
    ){}

    private vuList:string = "list" 
    private vuOther:string = "other"

    ngOnInit():void {
       this.empSvc.error$.subscribe(err => this.rxError(err))
        
        this.list()
    }

    ngOnDestroy():void {}

    private currentView : string = vuList

    private rxError (err: any): void {
        this.addErrorMsg(JSON.stringify(err))
    }

    private get itemId() : number {
        return this.empSvc.selectedEmployeeId
    }

    private set itemId (value: number){
        this.empSvc.selectedEmployeeId = value
    }

    private get selectedItem(): Observable<Employee> {
        return this.empSvc.selectedItem$
    }

    private get items(): Observable<Employee[]> {
        return this.empSvc.item$
    }

    public addInfoMsg (msg : string): void {
        this.notifierSvc.addInfoMsg ([msg])
    }

    public addErrorMsg ( msg : string): void {
        this.notifierSvc.addErrorMsg ([msg])
    }

    private displayMessage (msg: string){
        $(".display").append(
            $("<div/>").html(msg)
        )
    }

    private clearDisplay(): void {
        $(".display").html('')
    }

    private add(): void {
        this.currentView = vuAdd
        
        this.itemId = 0;

    }

    private edit(id: number): void {
        this.currentView = vuEdit
        this.itemId = id;

    }

    private detail(id: number): void {
        this.currentView = vuDetail
        this.itemId = id;

    }

    private list(): void {
        window.scrollTo(0, 0)
        this.currentView = vuList
        this.itemId=0
        this.empSvc.getItems()
	//	this.notifierSvc.setThrobber(ThrobberMessage.create("consumers", true))
    }

    private delete(id: number): void {
        this.currentView = vuDelete
        this.itemId = id;

    }

    private addInfoMessage(msg: string): void {
        this.notifierSvc.addInfoMsg([msg])
    }

    private addErrorMessage(msg: string): void {
        this.notifierSvc.addErrorMsg([msg])
    }

    private onChildEvent(result?: ResultModel): void {
        if (result) {
            if (result.success) {
                this.addInfoMessage(result.msgs[0])
            } else {
                this.addErrorMessage(result.msgs[0])
            }
            //this.notify(NotifierMessage.create(result.success, result.msgs))
        }
        this.list();
    }

    private onChildError(result: ResultModel): void {
        this.addErrorMessage( result.msgs[0])
    }

    private snkListStdOut(msg: ListResult): void {
        console.log (`snkListStdOut called currentView: ${this.currentView}`, msg)   
        if (msg && msg.method && msg.id){
            switch(msg.method){
                case "edit": this.edit(msg.id); break;
                case "delete": this.delete (msg.id); break;
                case "detail": this.detail(msg.id); break;
                default:
                    console.log (`unknown msg.method ${msg.method}`)   
                    
                    break
            }
        }else {
            this.addInfoMessage (`snkListStdOut called with invalid msg\r\n${JSON.stringify(msg)}`)
        }
    }
    
}
 