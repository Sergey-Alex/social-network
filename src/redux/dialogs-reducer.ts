import {ActionsType, MessageTypeText, PostDataTypes, StatePropsType} from "./store";
import {message} from "antd";


// type DialogsReducerType = {
//     state: StatePropsType
//     action: ActionsType
// }
const ADD_MESSAGE = 'ADD-MESSAGE'
const CHANGE_NEW_DIALOGS_MESSAGES = 'CHANGE_NEW_DIALOGS_MESSAGES'

export const addMessageDialogAC = (message: string) => {
    return {type: ADD_MESSAGE, postMessage: message} as const
}
export const ChangeMessageDialogsAC = (message: string) => {
    return {type: CHANGE_NEW_DIALOGS_MESSAGES, newMessage: message} as const
}
type InitialStateType = {
    message: Array<MessageTypeText>,
    newDialogMessage: string
}
let initialState: InitialStateType  = {
        message: [
            {id: 1, textMessage: 'Hello'},
            {id: 2, textMessage: 'hi hey'},
            {id: 3, textMessage: 'wasaaap'}
        ],
        newDialogMessage: ''

}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageTypeText = {
                id: new Date().getTime(),
                textMessage: action.postMessage
            }
            const newMessageData = [...state.message]
            newMessageData.push(newMessage)
            return {...state, newDialogMessage: '', message: newMessageData}
        case CHANGE_NEW_DIALOGS_MESSAGES:
            return {...state, newDialogMessage: action.newMessage}
        default:
            return state
    }


}

export default dialogsReducer