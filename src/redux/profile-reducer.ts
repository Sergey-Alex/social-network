import {ActionsType, DiaologPropsType, PostDataTypes} from "./store";


const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'

export const AddPostAC = () => {
    return {type: ADD_POST} as const
}

export const ChangeNewTextAC = (newText: string) => {
    return {type: CHANGE_NEW_POST_TEXT, newText: newText} as const
}

type InitialStateType = {
    messageForNewPost: string
    postData: Array<PostDataTypes>
}
let initialState : InitialStateType = {
    messageForNewPost: '',
    postData: [
        {id: 1, message: 'Hi it work111 ', likesCount: 12},
        {id: 2, message: 'Hi it work222', likesCount: 100},
        {id: 3, message: 'Hi it work333', likesCount: 200},

    ],
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostDataTypes = {
                id: new Date().getTime(),
                message: state.messageForNewPost,
                likesCount: 0
            }
            const newPostData = [...state.postData]
            newPostData.push(newPost)
            return {...state, postData: newPostData, messageForNewPost: ""}
        case CHANGE_NEW_POST_TEXT:
            return {...state, messageForNewPost: action.newText}
        default:
            return state
    }
}

export default profileReducer

