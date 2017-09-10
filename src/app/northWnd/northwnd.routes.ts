import { ModuleWithProviders } from '@angular/core'

import { Routes, RouterModule } from "@angular/router" 

import { NorthWndComponent } from './northwnd.component' 
import { EmployeesComponent } from './employees/employees.component'

export const northwndRoutes: Routes = [
    {
        path: 'northwnd',
        component: NorthWndComponent,
        // children: [
        //     { path: "", component: EmployeesComponent}
        //     , { path: "employees", component: EmployeesComponent}
        // ]
    }
] 

export const NorthWndRoutingModule: ModuleWithProviders = RouterModule.forChild(northwndRoutes) 