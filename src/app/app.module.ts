import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { appRoutesModule } from './app.routes'
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component'
import { NorthWndModule } from './northWnd/northWnd.module'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { APP_BASE_HREF } from '@angular/common';
// they say, if you import a service at the app module level, 
// that service will be available to everycomponent in the app
// and it'll be the same instance.

import { ConfigService } from './config/config.service'
import { NotifierService } from './notifier/notifier.service'

@NgModule({
  imports: [
    BrowserModule
    , HttpModule
    , appRoutesModule
    , FormsModule
    , BrowserAnimationsModule
    , NorthWndModule
    , RouterModule


  ]
  , declarations: [
    AppComponent
    , HomeComponent
  ]
  , providers: [ { provide: APP_BASE_HREF, useValue: '/' }
    , ConfigService
    , NotifierService ]
  , bootstrap: [ AppComponent ]
  , exports: [
    BrowserAnimationsModule

  ]


})
export class AppModule { }
