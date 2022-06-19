import {ActionsType, StatePropsType} from "./store";

type InitialStateProps = {
    usersFriend: Array<string>
}


let initialState: InitialStateProps = {
    usersFriend: ['Petya', 'Nika', 'John']
}


const sidebarReducer = (state = initialState, action: any) => {

    return state
}

export default  sidebarReducer