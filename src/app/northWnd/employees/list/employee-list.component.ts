import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations'

import { Observable } from 'rxjs/Observable'
// import { EmployeeService } from '../employee.service'
import { Employee } from '../employee'
// import { ResultModel } from '../../../../../models/resultModel'

export class ListResult {
    constructor(
        public id: number,
        public method: string
    ){}
    public static create(id:number, method:string): ListResult{
        return new ListResult(id, method)
    }
}

@Component({
  
    selector: 'emp-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class EmployeeListComponent implements OnInit, OnDestroy{
    @Input('items') item$ : Observable<Employee[]>
    @Output("stdout") stdOutEmitter : EventEmitter<ListResult> = new EventEmitter<ListResult>()

    ngOnInit(): void {}

    ngOnDestroy(): void {}

    private detail( id: number, event: Event): void {
        event.stopPropagation()
        this.stdOutEmitter.emit (ListResult.create(id, "detail"))
    }

    private edit( id: number, event: Event): void {
      
        event.stopPropagation()
        this.stdOutEmitter.emit (ListResult.create(id, "edit"))
    }

    private delete( id: number, event: Event): void {
        event.stopPropagation()
        this.stdOutEmitter.emit(ListResult.create(id, "delete"))
    }
}
