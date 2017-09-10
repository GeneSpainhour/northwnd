
import { Routes, RouterModule } from "@angular/router" 

import { EmployeesComponent } from './employees.component' 

export const employeeRoutes: Routes = [
    {
        path: 'employees',
        component: EmployeesComponent,
    
     
    }
] 

export const EmployeeRoutingModule = RouterModule.forChild(employeeRoutes) 