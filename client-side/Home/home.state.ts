export type ViewState = "home" | "registration" | "overview"

export interface Person {
    name: string,
    lastname: string,
    age: number
}

export interface HomeState 
{
    // storage: Map<number, Person>,
    id: number,
    view: ViewState,
    // test: number,
    // testName: string,
    updateViewState: (view : ViewState) => (state: HomeState) => HomeState
    // insertPerson: (person : Person) => (state: HomeState) => HomeState
    // updateTest : (num: number) => (state: HomeState) => HomeState
}



export const initHomeState: HomeState = 
{
    view: "home",
    // storage: new Map<number, Person>(),
    // test: 999,
    id: 0,
    // testName: "Bob",


    updateViewState: (view: ViewState) => (state: HomeState): HomeState => {
        return {
            ...state,
            view: view,
        }
    },

    // insertPerson: (person: Person) => (state: HomeState): HomeState => {
    //     return {
    //         ...state,
    //         id: state.id+1,
    //         storage: state.storage.set(state.id, {
    //             name: person.name, 
    //             lastname: person.lastname, 
    //             age: person.age})
                
    //     }
    // },

    // updateTest : (num: number) => (state: HomeState) : HomeState => {
    //     return {
    //         ...state,
    //         test: num
    //     };
    // },




}