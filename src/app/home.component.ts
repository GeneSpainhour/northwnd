import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template:`
    <div class="intro">
    <p> I've been interested in redux for a while, but never felt like I could get my head around it. So, I thought I'd try
    to write an implementation to become familiar with the technology before going to another framework.  This is what I came up with. 
    It turned out to be a generic messaging system feeding the next state processor with pre-defined actions. And it can
    be implemented in an angular application in just a few minutes. Take a look at how simple employee.service is. </p>
    
      <p> Redo is a redux-like, state-driven, angular service framework. Additionaly, the generic messaging system contained in Redo can be adapted 
      to any messaging platform. </p>
      <p> Redux principles: </p>
      <ul>
        <li> defined actions are dispatched to the reducer, where the next state is determined </li>
        <li> next state added to the service's IAppState stream to which the components subscribe.</li>
        <li> data flows in one direction only </li>
        <li> actions are reduced with pure functions: no side affects, same input always produces the same output </li>
      </ul>
      <p> Components </p>
      <ul>
        <li> State : root component which subscribes to ActionSubject </li>
        <li> EntityStateService: performs generic Entity operations </li>
        <li> FeatureService: performs Entity Specific operations and works with EntityActions</li>
        <li> IAction: {{'{'}}type:string, payLoad: any{{'}'}}  typical IAction </li>
        <li> IActionReducer : {{'{'}}  type: string, payLoad: any, reduce:(state: IAppState)=> IAppState{{'}'}}</li>
        <li> actionFactory : {{'{'}} (type:string ) => IActionReducer{{'}'}} : factory function returning 
        the action reducer defined with the given type. </li>
      </ul>

      <p> Use (order not specific) </p>
      <ul>
        <li> Create the Actions for the Entity. The Employee Actions would do for a start: 
          app/employees/state/empActions.ts. </li>
        <li> Create the Entity Service. The EmployeeService class is a good place to start </li>
      </ul>


    </div>

    <style>
      .intro p {
        margin-left: 20px;

      }
      .intro ul {
        margin: 10px;
      }

    </style>
  `
})
export class HomeComponent { }
