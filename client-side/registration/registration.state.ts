import { Person } from "../Home/home.state"


export type RegisterationState = Person & {

    updateName: (name: string) => (state:RegisterationState) => RegisterationState
    updateLastName: (lastname: string) => (state:RegisterationState) => RegisterationState
    updateAge: (age: number) => (state:RegisterationState) => RegisterationState
    clearContents:()=>(state:RegisterationState)=>RegisterationState
}


export const initRegistrationState: RegisterationState =
{
    name: "",
    lastname: "",
    age: 0,


    updateName: (name: string) => (state: RegisterationState): RegisterationState => {
        return {
            ...state,
            name: name,
            updateName: state.updateName,
        }
    },

    updateLastName: (lastName: string) => (state: RegisterationState): RegisterationState => {
        return {
            ...state,
            lastname: lastName,
            updateLastName: state.updateLastName,
        }
    },

    updateAge: (age: number) => (state: RegisterationState): RegisterationState => {
        return {
            ...state,
            age: age,
            updateAge: state.updateAge,
        }
    },
    //when clicking reset fields
    clearContents:()=> (state:RegisterationState):RegisterationState=>{
        return{
            ...state,
            name: "",
            lastname: "",
            age: 0,
        }
    }

}