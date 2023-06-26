import {AddPostAC, ChangeNewTextAC} from "./profile-reducer";

export type MessageTypeText = {
    id: number
    textMessage: string
}

export type DialogsActionsType =
    ReturnType<typeof AddPostAC>
    | ReturnType<typeof ChangeNewTextAC>
    | ReturnType<typeof addMessageDialogAC>
  //  | ReturnType<typeof ChangeMessageDialogsAC>


const ADD_MESSAGE = 'ADD-MESSAGE'
//const CHANGE_NEW_DIALOGS_MESSAGES = 'CHANGE_NEW_DIALOGS_MESSAGES'

export const addMessageDialogAC = (values:string) => {
    return {type: ADD_MESSAGE, values} as const
}
// export const ChangeMessageDialogsAC = (message: string) => {
//     return {type: CHANGE_NEW_DIALOGS_MESSAGES, newMessage: message} as const
// }

export type DialogPropsType = {
    name: string
    id: number
}

type InitialStateType = {
    message: Array<MessageTypeText>

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
    ]

}

const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionsType): InitialStateType => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageTypeText = {
                id: new Date().getTime(),
                textMessage: action.values
            }
            return {...state,  message: [...state.message, newMessage]}
        default:
            return state
    }


}

export default dialogsReducer
