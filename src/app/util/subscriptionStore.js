"use strict";
exports.__esModule = true;
var SubscriptionStore = (function () {
    function SubscriptionStore() {
        this.subscriptions = [];
    }
    SubscriptionStore.prototype.add = function (subscription) {
        this.subscriptions.push(subscription);
    };
    SubscriptionStore.prototype.unsubscribe = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    return SubscriptionStore;
}());
exports.SubscriptionStore = SubscriptionStore;
