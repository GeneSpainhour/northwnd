import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { ResultModel } from '../../../models/resultModel'

import { Employee } from '../employee'

@Component({
  
    selector: 'emp-edit',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy{
    @Input("item") item: Observable<Employee>
    @Input("mode") mode : string
    @Output("onAction") actionEmitter : EventEmitter<ResultModel> = new EventEmitter<ResultModel>(false)

    private _banner : {firstName: string, lastName: string }={firstName: "", lastName: ""}

    ngOnInit():void {
        this.item.subscribe(
            it => this.rxModel (it)
        )
    }

    private model : Employee = null

    private rxModel (it: Employee): void {
       this.model = it
    }

    ngOnDestroy():void {}

    private get banner() : string{
        return `${this.model.firstName} ${this.model.lastName}`
    }

    private back (): void {
        this.actionEmitter.emit (ResultModel.create(true, null, 'back'))
    }

}
