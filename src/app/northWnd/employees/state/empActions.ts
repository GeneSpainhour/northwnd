
export const axFill_Empl = "emp/fill"
export const axFilled_Empl = "emp/filled"
export const axAdd_Empl = "emp/add"
export const axEdit_Empl = "emp/edit"
export const axDel_Empl = "emp/delete"
export const axClr_Empl = "emp/clear"

export const axAdd_Sel = "sel/add"
export const axClr_Sel = "sel/clear"


import { Employee } from '../employee'

import * as ad from '../../../util/state/actionDispatcher'
import { AppState, IAppState } from '../../../util/state/state'

export const types : string [] = [
    axFill_Empl
    , axFilled_Empl
    , axAdd_Empl
    , axEdit_Empl
    , axDel_Empl
    , axClr_Empl
    , axAdd_Sel
    , axClr_Sel
 ]


export function actionFactory (action: ad.IAction): ad.IActionReducer<Employee>{
    let retAction : ad.IActionReducer<Employee>= null 
    switch (action.type){
        case axFill_Empl : retAction = FillAction.create (action.payLoad) ; break;
        case axFilled_Empl : retAction = FilledAction.create (action.payLoad) ; break;
        case axAdd_Empl : retAction = AddAction.create (action.payLoad) ; break;
        case axEdit_Empl : retAction = EditAction.create (action.payLoad) ; break;
        case axDel_Empl : retAction = DelAction.create (action.payLoad) ; break;
        case axClr_Empl : retAction = ClrAction.create () ; break;
        case axAdd_Sel : retAction = SelAddAction.create (action.payLoad) ; break;
        case axClr_Sel : retAction = SelClrAction.create (action.payLoad) ; break;        
    }
    return retAction
}

export class FillAction implements ad.IActionReducer<Employee>{
    public type: string = axFill_Empl
    constructor (
        public payLoad? : Employee
    ){}

    public reduce (state: IAppState<Employee>) : IAppState<Employee>{
        
        return AppState.create<Employee>([],  Object.assign({}, state.selectedItem))
    }

    public static create (emp?:Employee): FillAction {
        return new FillAction (emp )
    }
}
export class FilledAction implements ad.IActionReducer<Employee>{
    public type: string = axFilled_Empl
   
    constructor (
        public payLoad : Employee[]
    ){}

    public reduce (state:  IAppState<Employee>) : IAppState<Employee>{
        
        return AppState.create<Employee>([...this.payLoad],  Object.assign({}, state.selectedItem))
    }

    public static create (items?:Employee[]): FilledAction {
        return new FilledAction (items )
    }
}

export class AddAction implements ad.IActionReducer<Employee>{
    public type: string = axAdd_Empl
    constructor (
        public payLoad : Employee
    ){}

    public reduce (state: IAppState<Employee>) : IAppState<Employee>{
        let exeItems : Employee[] = state.items.filter( s => s.employeeID != this.payLoad.employeeID)
        let stateItems : Employee[] = exeItems ? [...exeItems, this.payLoad] : [this.payLoad]
        return AppState.create<Employee>(stateItems,  Object.assign({}, state.selectedItem))
    }

    public static create (employee?:Employee): AddAction {
        return new AddAction (employee )
    }
}


export class EditAction implements ad.IActionReducer<Employee>{
    public type: string = axEdit_Empl
    constructor (
        public payLoad : Employee
    ){}

    public reduce (state: IAppState<Employee>) : IAppState<Employee>{
        let exItems : Employee[] = state.items.filter ( emp => emp.employeeID != this.payLoad.employeeID)
        let stateItems : Employee[] = exItems ? [...exItems, this.payLoad] : [this.payLoad]
        return AppState.create<Employee>(stateItems,  Object.assign({}, state.selectedItem))
    }

    public static create (emp:Employee): EditAction {
        return new EditAction (emp )
    }
}


export class DelAction implements ad.IActionReducer<Employee>{
    public type: string = axDel_Empl
    constructor (
        public payLoad : Employee
    ){}

    public reduce (state: IAppState<Employee>) : IAppState<Employee>{
        let exItems : Employee[] = state.items.filter ( emp => emp.employeeID != this.payLoad.employeeID)
        return AppState.create<Employee>(exItems,  Object.assign({}, state.selectedItem))
    }

    public static create (emp:Employee): DelAction {
        return new DelAction (emp )
    }
}


export class ClrAction implements ad.IActionReducer<Employee>{
    public type: string = axClr_Empl
    constructor (
        public payLoad? : Employee
    ){}
    
    public reduce (state: IAppState<Employee>) : IAppState<Employee>{
        return AppState.create<Employee>([],  Object.assign({}, state.selectedItem))
    }

    public static create (): ClrAction {
        return new ClrAction ()
    }
}

// this would indicate the item was selected
// probably a selected item collection
// need to clear too i guess
export class SelAddAction implements ad.IActionReducer<Employee>{
    public type: string = axAdd_Sel
    constructor (
        public payLoad? : Employee
    ){}

    
    public reduce (state: IAppState<Employee>) : IAppState<Employee>{
        return AppState.create<Employee>([...state.items],  Object.assign({}, this.payLoad))
    }

    public static create (emp:Employee): SelAddAction {
        return new SelAddAction (emp)
    }
}

export class SelClrAction implements ad.IActionReducer<Employee>{
    public type: string = axClr_Sel
    constructor (
        public payLoad? : Employee
    ){}

    
    public reduce (state: IAppState<Employee>) : IAppState<Employee>{
        return AppState.create<Employee>([...state.items],  null)
    }

    public static create (emp:Employee): SelAddAction {
        return new SelAddAction (emp)
    }
}
