import React from "react"
import { initRegistrationState, RegisterationState } from './registration.state';
import { Person } from "../Home/home.state"
import { submit } from './registration.api';


export interface RegisterationProps{
    backToMainHome :()=>void
    // insertPerson: (person: Person)=>void
    // testVal: number
    // testName: string
    // updateTest : (num : number) => void
}


export class RegistrationForm extends React.Component<RegisterationProps,RegisterationState> {

    constructor(props: RegisterationProps){
        super(props)
        this.state = initRegistrationState

    }



    render():JSX.Element{
        let condition = true
        return(
            <div>
                <div>
                    Welcome to our Registration page
                </div>
                {/* <br /> */}
                {/* <div>
                    this is the test value: {this.props.testVal}
                    <br />
                    this is the test name: {this.props.testName}
                    <br />
                    <button
                        onClick = {e=>this.props.updateTest(555)}
                    >
                        Update test
                    </button>
                </div> */}
                <br />
                <div>
                    Name:
                    <input
                        value = {this.state.name}
                        onChange ={e=>this.setState(this.state.updateName(e.currentTarget.value))}  
                        >
                    </input>
                    < br />
                    Lastname:
                    <input
                        value = {this.state.lastname}
                        onChange ={e=>this.setState(this.state.updateLastName(e.currentTarget.value))}  
                        >
                    </input>
                    < br />
                    Age:
                    <input
                        value = {this.state.age}
                        type = "number"
                        onChange ={e=>this.setState(this.state.updateAge(Number(e.currentTarget.value)))}  
                        >
                    </input>
                    <br />
                    <button
                        onClick={()=> {
                            // this.props.insertPerson({name: this.state.name, lastname: this.state.lastname, age: this.state.age});
                            submit({name: this.state.name, lastname: this.state.lastname, age: this.state.age});
                            this.setState(this.state.clearContents());
                            
                        }}
                        >
                        Submit
                    </button>
                    <br />
                    <button
                        onClick={e=>this.props.backToMainHome()}
                    >
                        Back
                    </button>
                </div>
            </div>
        )
    }
}