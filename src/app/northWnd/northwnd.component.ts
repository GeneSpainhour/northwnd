import { Component, OnInit, OnDestroy } from '@angular/core';

import * as $ from 'jquery'


import { NotifierService } from '../notifier/notifier.service'

import { NotifyingComponent } from '../notifier/notifying.component'

const tabEmployee = "Employees"

@Component({

    selector: 'northwnd',
    templateUrl: './northwnd.component.html',
    styleUrls: [ './northwnd.component.css' ]
})
export class NorthWndComponent extends NotifyingComponent implements OnInit, OnDestroy {
    constructor(
        notifierSvc: NotifierService
    ) {
        super(notifierSvc)
    }

    ngOnInit(): void { }

    ngOnDestroy(): void { }

    private toggleNavigation(event: Event): void {
        event.stopPropagation()
        $(".app").toggleClass("mini-navbar")

    }

    private _tabs: SelectableTab[] = null

    private tabNames: string[] = [ tabEmployee ]
    private activeTabs: string[] = [ tabEmployee ]

    private get tabs(): SelectableTab[] {
        if (this._tabs == null) {
          
            this._tabs = SelectableTab.createTabList(this.tabNames)
            this._tabs.forEach(t => t.selected = this.activeTabs.includes(t.tabName))
            console.log ("tabs", this._tabs)
        }
        return this._tabs
    }

    private toggle(tabName: string): void {
        let item = this.tabs.find(t => t.tabName == tabName)
        if (item) {
            if (!item.selected){
                this.tabs.forEach( t => t.selected = false)
            }
            item.selected = !item.selected
        }
    }


    private reOrder(): void {
        let selected = this.tabs.filter(t => t.selected)
        if (selected && selected.length > 0) {
            let marginCount = selected.length - 1
            let percentWidth = 100 / selected.length - marginCount
            percentWidth = percentWidth > 94 ? 95 : percentWidth

            selected.forEach(tab => {
                $(`.content .${tab.tabName}`).css({ "width": `${percentWidth}%` })
            })
        }

    }

    private show(pg: string): boolean {
        let tab : SelectableTab = this.tabs.find( t => t.tabName.toLowerCase() == pg.toLowerCase())
        // console.log (`show : {pg:${pg}) selected: ${tab.selected}} `)
        return tab.selected
    }
}


class SelectableTab {
    constructor(public tabName: string, public selected: boolean) { }

    public static create(tab?: string, selected?: boolean): SelectableTab {
        return new SelectableTab(tab || "", selected || false)
    }

    public static createTabList(names: string[]): SelectableTab[] {
        let tabs: SelectableTab[] = names.map(item => SelectableTab.create(item, false))
        return tabs
    }
}