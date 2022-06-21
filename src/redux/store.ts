import profileReducer, {AddPostAC, ChangeNewTextAC} from "./profile-reducer";
import dialogsReducer, {addMessageDialogAC, ChangeMessageDialogsAC} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

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

export type SidebarType = {
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

const store = {
    _state: {
        profilePage: {
            messageForNewPost: '',
            postData: [
                {id: 1, message: 'Hi it work111 ', likesCount: 12},
                {id: 2, message: 'Hi it work222', likesCount: 100},
                {id: 3, message: 'Hi it work333', likesCount: 200},

            ],

        },
        messagePage: {
            message: [
                {id: 1, textMessage: 'Hello'},
                {id: 2, textMessage: 'hi hey'},
                {id: 3, textMessage: 'wasaaap'}
            ],
            dialogsData: [
                {id: 1, name: 'Dymych'},
                {id: 2, name: 'Andrat'},
                {id: 3, name: 'Sergey'},
                {id: 4, name: 'Anna'},
                {id: 5, name: 'Alina'}
            ],
            newDialogMessage: ''
        },
        sidebar: {
            usersFriend: ['Petya', 'Nika', 'John']
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
        // this._state.profilePage = profileReducer(this._state.profilePage, action)
        // this._state.messagePage = dialogsReducer(this._state.messagePage, action)
        // this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._renderTree()

    }
}


export default store
