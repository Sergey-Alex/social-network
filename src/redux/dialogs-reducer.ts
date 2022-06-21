import {ActionsType, MessageTypeText} from "./store";


const ADD_MESSAGE = 'ADD-MESSAGE'
const CHANGE_NEW_DIALOGS_MESSAGES = 'CHANGE_NEW_DIALOGS_MESSAGES'

export const addMessageDialogAC = () => {
    return {type: ADD_MESSAGE} as const
}
export const ChangeMessageDialogsAC = (message: string) => {
    return {type: CHANGE_NEW_DIALOGS_MESSAGES, newMessage: message} as const
}

export type DialogPropsType = {
    name: string
    id: number
}

type InitialStateType = {
    message: Array<MessageTypeText>
    newDialogMessage: string
    dialogsData: Array<DialogPropsType>
}

let initialState: InitialStateType  = {
    message: [
        {id: 1, textMessage: 'Hello'},
        {id: 2, textMessage: 'hi hey'},
        {id: 3, textMessage: 'wasaaap'}
    ],
    dialogsData: [
        {id: 1, name: 'Dymych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sergey'},
        {id: 4, name: 'Anna'},
        {id: 5, name: 'Alina'}
    ],
    newDialogMessage: ''

}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageTypeText = {
                id: new Date().getTime(),
                textMessage: state.newDialogMessage
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