import React from "react"
import { initRegistrationState, RegisterationState } from './registration.state';
import { submit } from './registration.api';
import { MainHome } from "../MainHome/MainHome";


export interface RegisterationProps{
    backToMainHome :()=>void
}


export class RegistrationForm extends React.Component<RegisterationProps,RegisterationState> {

    constructor(props: RegisterationProps){
        super(props)
        this.state = initRegistrationState

    }

    handelsubmit = () =>{
        submit({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            username: this.state.username,
            recuringdays: this.state.recuringdays,
        })
        this.setState(initRegistrationState);
        this.props.backToMainHome();
    }

    render():JSX.Element{

        return(
            <div>
                <div>
                    Welcome to the Registration Page
                </div>
                <br />
                <div>
                    First Name:
                    <input
                        value = {this.state.firstname}
                        onChange ={e=>this.setState(this.state.updateName(e.currentTarget.value))}  
                        >
                    </input>
                    < br />
                    Last Name:
                    <input
                        value = {this.state.lastname}
                        onChange ={e=>this.setState(this.state.updateLastName(e.currentTarget.value))}  
                        >
                    </input>
                    < br />
                    User Name:
                    <input
                        value = {this.state.username}
                        onChange ={e=>this.setState(this.state.updateUsername(e.currentTarget.value))}
                        placeholder="it should contain '@'"
                        >
                    </input>
                    < br />
                    Password:
                    <input
                        value = {this.state.password}
                        onChange = {e => this.setState(this.state.updatePassword(e.currentTarget.value))}  
                        >
                    </input>
                    < br />
                    < br />
                    <button
                        onClick={()=> {
                            this.handelsubmit();
                        }}
                        >
                        Submit
                    </button>
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