export interface Person {
    firstname: string,
    lastname: string,
    password: string,
    username: string,
    recuringdays: string
  }


export type RegisterationState = Person & {
    isRegisterd: boolean,
    updateName: (firstname: string) => (state:RegisterationState) => RegisterationState
    updateLastName: (lastname: string) => (state:RegisterationState) => RegisterationState
    updatePassword: (password: string) => (state:RegisterationState) => RegisterationState
    updateUsername: (username: string) => (state:RegisterationState) => RegisterationState
}


export const initRegistrationState: RegisterationState =
{
    isRegisterd: false,
    firstname: "",
    lastname: "",
    password: "",
    username: "",
    recuringdays: "mo,tu,we,th,fr",


    updateName: (firstname: string) => (state: RegisterationState): RegisterationState => {
        return {
            ...state,
            firstname: firstname
        }
    },

    updateLastName: (lastName: string) => (state: RegisterationState): RegisterationState => {
        return {
            ...state,
            lastname: lastName
        }
    },

    updatePassword: (password: string) => (state: RegisterationState): RegisterationState => {
        return {
            ...state,
            password: password
        }
    },

    updateUsername: (username: string) => (state: RegisterationState): RegisterationState => {
        return {
            ...state,
            username: username,
        }
    },

}