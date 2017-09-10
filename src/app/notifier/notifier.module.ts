// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// This Module's Components
import { NotifierComponent } from './notifier.component';


@NgModule({
    imports: [
       CommonModule
    ],
    declarations: [
        NotifierComponent,
      
    ],
    exports: [
        NotifierComponent,
       
    ]
})
export class NotifierModule {

}
