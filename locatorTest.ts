

import * as loc from './src/app/drawingboard/state/stateLocator'

export const axCircAdd = "circ/add"
export const axCircEdit = "circ/edit"
export const axCircDel = "circ/delete"
export const axCircClr = "circ/clear"
export const axSelAdd = "sel/add"
export const axSelClr = "sel/clear"

export const types : string [] = [axCircAdd, axCircEdit, axCircDel,axCircClr]

loc.StateLocator.register(loc.LocatorEntry.create("one", types, null))

console.log ("items",  loc.StateLocator.locate("circ"))

export const axRectAdd = "rect/add"
export const axRectEdit = "rect/edit"
export const axRectDel = "rect/delete"
export const axRectClr = "rect/clear"


const types2 : string [] =  [axRectAdd, axRectEdit, axRectDel,axRectClr, axSelAdd, axSelClr]
loc.StateLocator.register(loc.LocatorEntry.create("two", types2, null))




console.log ("circ items after adding type2", loc.StateLocator.locate("circ"))

console.log ("rect items after adding type2", loc.StateLocator.locate("rect"))