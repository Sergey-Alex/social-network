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
        message: Array<MessageTypeText>
    },
    sidebar: {
        usersFriend: Array<string>
    }

}

export type StoreType = {
    _state: StatePropsType
    _renderTree: () => void  // onChange y D
    subscribe: (observer: () => void) => void
    getState: () => StatePropsType
    dispatch: (action: ActionsType) => void
}

type AddPostActionType = {
    type: 'ADD-POST'
    postText: string
}

type ChangeNewTextActionType = {
    type: 'CHANGE-NEW-POST-TEXT'
    newText: string

}

export type ActionsType = AddPostActionType | ChangeNewTextActionType

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
    dispatch(action: any) {
        if (action.type === 'ADD-POST') {
            const newPost: PostDataTypes = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: 0
            }
            this._state.profilePage.postData.push(newPost)
            this._renderTree()
        } else if (action.type === 'CHANGE-NEW-POST-TEXT') {
            this._state.profilePage.messageForNewPost = action.newText
            this._renderTree()
        }
    }

}


// let state: StatePropsType = {
//     profilePage: {
//         messageForNewPost: '',
//         postData: [
//             {id: 1, message: 'Hi it work111 ', likesCount: 12},
//             {id: 2, message: 'Hi it work222', likesCount: 100},
//             {id: 3, message: 'Hi it work333', likesCount: 200},
//
//         ],
//         dialogsData: [
//             {id: 1, name: 'Dymych'},
//             {id: 2, name: 'Andrat'},
//             {id: 3, name: 'Sergey'},
//             {id: 4, name: 'Anna'},
//             {id: 5, name: 'Alina'}
//         ],
//     },
//     messagePage: {
//         message: [
//             {id: 1, textMessage: 'Hello'},
//             {id: 2, textMessage: 'hi hey'},
//             {id: 3, textMessage: 'wasaaap'}
//         ],
//     },
//     sidebar: {
//         usersFriend: ['Petya', 'Nika', 'Jhon']
//     }
// }
//
// export const addPost = (postText: string) => {
//     const newPost: PostDataTypes = {
//         id: new Date().getTime(),
//         message: postText,
//         likesCount: 0
//     }
//     state.profilePage.postData.push(newPost)
//
//     state.profilePage.messageForNewPost = ''
// }
//
// export const changeNewText = (newText: string) => {
//     state.profilePage.messageForNewPost = newText
//     renderTree()
// }


export default store