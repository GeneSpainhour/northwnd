# EntityStateService<T> - An "Flux Like" Angular Service.

Project Goals:
  * Impliment the SOLID flux principles
  * Transparent to Components

The previous version of our EntityServices were perfectly adequate, but the two-way update architecture put the components in the event handling process. There's plenty of that already with all the intra-component communication going on. So I thought the additional component logic was a problem.

The flux/redux architecture solves that problem. A component's State, ie: items: Customer[], selectedItem: Customer, is managed in one place called a store. Changes to the data, umm, state, are initiated by sending a request to a next state machine. The next state machine executes the necessary action to transition to the next state. 

Feature Services. These are angular services interacting with components and servers. Providing crud services to the components, they're usually names CustomerService or ConsumerService.

In flux nomenclature:
  * the request is called an action with type and payLoad parameters
  * the action is sent by the state's dispatch method
  * the next state machine is called the resolver. 

Feature Service Architecture:

  * ActionDispatcher : BehaviorSubject<Action>. Each entity service subscribes to receive new actions
  * EntityStateService : Implements next state resolution
  * EmployeeService: extending EntityStateService<Employee>, provides entity specific features

Entity Specific features:
  * State: State is abstraction of the component's data. Among it's methods are the request-sending, dispatch, and next-state-resolver, resolve.
  * Actions. The typical, if you will, action has a string type and a data containing payLoad of type any. Type is the key associating an action with a function to execute when that action is received. Flux requires that all such 'reducer' functions be pure functions, ie they don't have side effects, and they're like math functions : same inputs always produce the same outputs.

I extended the Action notion by adding a reduce method. Other flux/redux implementations go through all sorts of weird gyrations to "compose" the methods required to reduce an action. Sheesh! I thought it made sense, in terms of efficiency if nothing else, to define the specific function to call for the specific action I'm defining in one place. For our requirements at present it works for us.


  
