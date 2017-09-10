import { ModuleWithProviders } from '@angular/core'

import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from "./app.component"
import {HomeComponent} from "./home.component"

const appRoutes: Routes = [
  { 
    path: '', 
    component: HomeComponent ,

  },
  {
    path: "welcome", component: HomeComponent 
  }
]
  
 


export const appRoutesModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
