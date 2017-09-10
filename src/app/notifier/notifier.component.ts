import { Component, OnInit, AfterViewInit, AfterViewChecked, Input } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { NotifierMessage, ThrobberMessage } from './notifierMessage'

import * as $ from 'jquery'

@Component({
    
    selector: 'notifier',
   templateUrl: "./notifier.component.html"
   
})
export class NotifierComponent implements OnInit{

	@Input("source") msg$: Observable<NotifierMessage>
	@Input("throbber") throbber$: Observable<ThrobberMessage>

    private _showNotifier : boolean = false

    private get showNotifier(): boolean {
        return this._showNotifier
	}


	private _showThrobber: boolean = false

	private get showThrobber(): boolean {
		
		return this._showThrobber
	}

	private set showThrobber(bValue: boolean) {
		this._showThrobber =  bValue
	}

    private hidden:boolean = false

    private msg : string = ""

    private errors: string []=[]

    ngOnInit():void {

        this.msg$.subscribe(msg => this.notify(msg))

        this.throbber$.subscribe(msg => this.rxThrobberMessage(msg))

    }

    private bOpenGate: boolean = true

    private bCmdQueue : boolean[] = []

    private rxThrobberMessage(msg: ThrobberMessage): void {
        if (this.bOpenGate == true) {
            this.showThrobber = msg.showThrobber
            this.bOpenGate = false
        } else {
            this.bCmdQueue.push(msg.showThrobber)
        }

        setTimeout ( () => this.openGate(), 500)

    }

    private openGate(): void {
        this.bOpenGate = true
        if (this.bCmdQueue.length > 0) {
            this.showThrobber = this.bCmdQueue.pop()
            this.bCmdQueue = []
        }
    }
       

    ngAfterViewInit(): void {
        if (this.showThrobber && $(".throbber").length > 0) {
            this.setThrobberPosition()
        }
    }

	private setThrobberPosition(): void {
		let parentWidth: number = $(".throbber").offsetParent().width()
		let delta: number = $(".throbber").outerWidth() / parentWidth
		let leftPosition: string = (.5 * parentWidth * (1 - delta)).toString() + "px"
		console.log(`setting left position to ${leftPosition}`)
		$(".throbber").css({left: leftPosition })
	}

    private clearErrors(e: Event): void {
        e.stopPropagation()

        this.errors = []
    }

	public notify(msg: NotifierMessage): void {
		if (msg && msg.messages) {
			if (msg.messages.length > 0) {
				if (msg.success) {
					this.errors = []
					this.msg = msg.messages[0].replace('|', ' ')

					this.showNotifyMessage()
				} else {
					let newMessages = this.conditionErrorMessages(msg.messages)

					this.errors.push(...newMessages)
				}
			} else {
				this.errors = []
			}
		}
	}

    // some of the error strings are joined with '\r\n'
    // this may evolve inito something more robust
    private conditionErrorMessages(msgs: string[]): string[] {
        let items: string[] = []

        msgs.forEach(msg => {
            if (msg && msg.trim().length > 0) {
                if (msg.indexOf("\"") == 0) {
                    items.push(...JSON.parse(msg).split("\r\n"))
                } else {
                    items.push(...msg.split("\r\n"))
                }
            }
        })

        return items
    }

    private showNotifyMessage(): void {
        this._showNotifier = this.msg.length > 0

        if (this._showNotifier){
            setTimeout( ()=> this._showNotifier = false, 5000 )
        }
	}

	private _leftPosition: string 

	private set leftPosition(val: string) {
		this._leftPosition = `${val}px`
	}

	private get leftPosition(): string {
		return this._leftPosition
	}


}
