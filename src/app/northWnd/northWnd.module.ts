// Angular Imports
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from "@angular/router"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpModule } from "@angular/http"
import { FormsModule } from '@angular/forms'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'




// This Module's Components
import { NorthWndComponent } from './northwnd.component' 

// this module's routing module
import { NorthWndRoutingModule } from './northwnd.routes'
import { NorthWndService } from './northwnd.service' 

import { NotifierService } from '../notifier/notifier.service'
import { ConfigService } from '../config/config.service'

// feature modules
import { NotifierModule } from '../notifier/notifier.module'
import { EmployeeModule } from './employees/employee.module'

@NgModule({
    imports: [
        RouterModule
        , BrowserAnimationsModule
        , NorthWndRoutingModule
        , CommonModule
        , FormsModule
        , EmployeeModule
		
    ],
    declarations: [
        NorthWndComponent
		
    ],
    exports: [
        NorthWndComponent,
		
    ],
    providers: []
})
export class NorthWndModule {

}
