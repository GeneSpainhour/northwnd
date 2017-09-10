// Angular Imports
import { NgModule } from '@angular/core' 
import { RouterModule, Routes } from '@angular/router' 
import { CommonModule } from '@angular/common' 
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'

// inter app dependencies
import { NotifierModule } from '../../notifier/notifier.module'

// This Module's Components
import { EmployeesComponent } from './employees.component' 
import { EmployeeListComponent } from './list/employee-list.component'
import { EmployeeDetailComponent } from './detail/employee-detail.component'

// this module's routing module
import { EmployeeRoutingModule } from './employee.routes'


@NgModule({
    imports: [
        RouterModule
        , BrowserAnimationsModule
        , EmployeeRoutingModule
        , CommonModule
        , FormsModule
		, NotifierModule
		
    ],
    declarations: [
        EmployeesComponent
		, EmployeeListComponent
		, EmployeeDetailComponent
    ],
    exports: [
        EmployeesComponent
		
    ],
    providers: []
})
export class EmployeeModule {

}
