import {ActionsType, MessageTypeText, PostDataTypes, StatePropsType} from "./state";


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


const dialogsReducer = (state: InitialStateType, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageTypeText = {
                id: new Date().getTime(),
                textMessage: action.postMessage
            }
            state.newDialogMessage = ''
            state.message.push(newMessage)
            return  state
        case CHANGE_NEW_DIALOGS_MESSAGES:
            state.newDialogMessage = action.newMessage
          return state
        default:
            return state
    }


}

export default dialogsReducer