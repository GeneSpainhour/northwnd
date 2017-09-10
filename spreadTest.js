// I'm getting errors when trying to do this return [...state, this.payLoad] when state is empty - I think
// I made the problem go away by: return state && state.length > 0 ? [...state, this.payLoad] : [this.payLoad]
// but I want to see it throw
var items = "alpha beta gamma delta epsilon".split(' ');
console.log("items ", items);
var mItems = [];
console.log("mItems ", mItems.concat(['zulu']));
mItems = items.concat(['zeta']);
console.log("mItems ", mItems);
var nItems;
// this threw and reasonably so. nItems is undefined, so it can't behave like an array, duh
// console.log ("mItems ", [...nItems, 'zulu'])
// nItems = [...items, 'zeta']
// console.log ("mItems ", nItems)
nItems = []; // this will define it - just like mItems above
console.log("mItems ", nItems.concat(['zulu']));
nItems = items.concat(['zeta']);
console.log("mItems ", nItems);
