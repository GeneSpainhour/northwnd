
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { SubscriptionStore } from '../../util/subscriptionStore'



export class LocatorEntry {
    constructor (
        public key: string
        , public types: string[]
        , public state : any
    ){}

    public static create (key: string, types: string[], state: any): LocatorEntry{
        return new LocatorEntry (key, types, state)
    }
}

export class StateLocator {
    public static entries : LocatorEntry [] = []

    public static register (entry: LocatorEntry): void {
        if (entry && entry.key){
            if (StateLocator.entries.find(e => e.key == entry.key) == null) {
                let actionList: string[] = entry.types

                let existing = StateLocator.entries.filter(e => e.types.some(t => actionList.includes(t)))

                if (existing.length == 0) {
                    StateLocator.entries.push(entry)
                }
            }
        }
    }

    // action.type: major/minor = emp/add
    public static locate(actionMajor: string) : LocatorEntry[] {
        let entries : LocatorEntry[]
            = StateLocator.entries.filter (e => e.types.some(t => t.indexOf(actionMajor)> -1))
        return entries
    }
}
