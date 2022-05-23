import {AppProps} from "../App";
import {renderTree} from "./render";


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
        dialogsData: Array<DiaologPropsType>
        postData: Array<PostDataTypes>
    },
    messagePage: {
        message:Array<MessageTypeText>
    },
    sidebar: {
        usersFriend: Array<string>
    }

}


let state : StatePropsType = {
    profilePage: {
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
}

export const addPost = (postText: string) => {
    const newPost: PostDataTypes = {
        id: new Date().getTime(),
        message: postText,
        likesCount: 0
    }
    state.profilePage.postData.push(newPost)
    renderTree(state)
}


export default state