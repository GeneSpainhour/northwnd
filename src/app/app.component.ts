import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import * as vendors from '../vendor'

import * as $ from "jquery"

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
   
  ]
})
export class AppComponent { 

  private pageTitle: string = "Redo"
  constructor(){}

  private toggleNav(): void {
    $("#nav-alpha").toggle()

  }
}
