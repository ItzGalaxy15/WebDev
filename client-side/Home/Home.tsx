import React from "react";
import { HomeState, initHomeState, Person } from './home.state';
import { RegistrationForm } from "../registration/registration";
import { OverviewPage } from "../Overview/overview"

export class Home extends React.Component<{},HomeState>
{
    constructor(props: {}){
        super(props)
        this.state = initHomeState
    }
    
    render():JSX.Element{
        
        if (this.state.view === "home"){
            return(
                <div>
                    Welcome to my home page
                    <div>
                        <button
                            onClick={e=>this.setState(this.state.updateViewState("registration"))}
                        >
                            Registration</button>
                        <button
                            onClick={e=>this.setState(this.state.updateViewState("overview"))}
                        >
                            Overview</button>
                    </div>
                </div>


            )
        }
        else if (this.state.view == "registration")
        { 
            return (<RegistrationForm
                backToHome = {()=>this.setState((this.state.updateViewState("home")))}
                // insertPerson={(person: Person)=>this.setState(this.state.insertPerson(person))}
                // testVal = {this.state.test}
                // testName = {this.state.testName}
                // updateTest={(num:number) => this.state.updateTest(444)}
                // updateTest={(num:number) => this.setState(this.state.updateTest(555))}
                // resetFields={()=>this.setState(this.state.resetFields())}
            />)
        }
        else
        {
            return (<OverviewPage
                // storageToShow={this.state.storage}
                backToHome={()=>this.setState(this.state.updateViewState("home"))}
                
            />
            )
        }
        
    }

}