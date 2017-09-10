
import { Subscription } from 'rxjs/Subscription'

export class SubscriptionStore {

    private subscriptions : Subscription [] = []

    public add (subscription: Subscription): void {
        this.subscriptions.push (subscription)
    }

    public unsubscribe(): void {
        this.subscriptions.forEach ( s => s.unsubscribe())
    }
}