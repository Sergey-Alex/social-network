import {message} from "antd";

const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const ADD_MESSAGE = 'ADD-MESSAGE'
const CHANGE_NEW_DIALOGS_MESSAGES = 'CHANGE_NEW_DIALOGS_MESSAGES'

export type MessageTypeText = {
    id: number
    textMessage: string
}

export type DiaologPropsType = {
    name: string
    id: number
}

export type PostDataTypes = {
    id: number
    message: string
    likesCount: number
}

export type usersFriendType = {
    usersFriend: Array<string>

}

export type StatePropsType = {
    profilePage: {
        messageForNewPost: string
        dialogsData: Array<DiaologPropsType>
        postData: Array<PostDataTypes>
    },
    messagePage: {
        message: Array<MessageTypeText>,
        newDialogMessage: string
    },
    sidebar: {
        usersFriend: Array<string>
    }

}


export type ActionsType =
    ReturnType<typeof AddPostAC>
    | ReturnType<typeof ChangeNewTextAC>
    | ReturnType<typeof addMessageDialogAC>
    | ReturnType<typeof ChangeMessageDialogsAC>

export type StoreType = {
    _state: StatePropsType
    _renderTree: () => void  // onChange y D
    subscribe: (observer: () => void) => void
    getState: () => StatePropsType
    dispatch: (action: ActionsType) => void

}

export const AddPostAC = (postText: string) => {
    return {type: ADD_POST, postText: postText} as const
}

export const ChangeNewTextAC = (newText: string) => {
    return {type: CHANGE_NEW_POST_TEXT, newText: newText} as const
}

export const addMessageDialogAC = (message: string) => {
    return {type: ADD_MESSAGE, postMessage: message} as const
}
export const ChangeMessageDialogsAC = (message: string) => {
    return {type: CHANGE_NEW_DIALOGS_MESSAGES, newMessage: message} as const
}

const store = {
    _state: {
        profilePage: {
            messageForNewPost: '',
            postData: [
                {id: 1, message: 'Hi it work111 ', likesCount: 12},
                {id: 2, message: 'Hi it work222', likesCount: 100},
                {id: 3, message: 'Hi it work333', likesCount: 200},

            ],
            dialogsData: [
                {id: 1, name: 'Dymych'},
                {id: 2, name: 'Andrat'},
                {id: 3, name: 'Sergey'},
                {id: 4, name: 'Anna'},
                {id: 5, name: 'Alina'}
            ],
        },
        messagePage: {
            message: [
                {id: 1, textMessage: 'Hello'},
                {id: 2, textMessage: 'hi hey'},
                {id: 3, textMessage: 'wasaaap'}
            ],
            newDialogMessage: ''
        },
        sidebar: {
            usersFriend: ['Petya', 'Nika', 'Jhon']
        }
    },
    _renderTree() {
        console.log('state changed')
    },
    subscribe(observer: () => void) { // подписан на наблюдателя
        this._renderTree = observer
    },
    getState() {
        return this._state
    },
    dispatch(action: ActionsType) {
        if (action.type === ADD_POST) {
            const newPost: PostDataTypes = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: 0
            }
            this._state.profilePage.postData.push(newPost)
            this._renderTree()
        } else if (action.type === CHANGE_NEW_POST_TEXT) {
            this._state.profilePage.messageForNewPost = action.newText
            this._renderTree()
        } else if (action.type === ADD_MESSAGE) {
            const newMessage: MessageTypeText = {
                id: new Date().getTime(),
                textMessage: action.postMessage
            }
            this._state.messagePage.message.push(newMessage)
            this._renderTree()
        } else if (action.type === CHANGE_NEW_DIALOGS_MESSAGES){
            this._state.messagePage.newDialogMessage = action.newMessage
            this._renderTree()
        }
    }
}


export default store
