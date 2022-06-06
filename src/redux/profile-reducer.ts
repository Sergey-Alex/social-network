import {ActionsType, DiaologPropsType, PostDataTypes} from "./state";

// type ProfileReducerType = {
//     state: StatePropsType
//     action: ActionsType
// }

const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
export const AddPostAC = (postText: string) => {
    return {type: ADD_POST, postText: postText} as const
}

export const ChangeNewTextAC = (newText: string) => {
    return {type: CHANGE_NEW_POST_TEXT, newText: newText} as const
}

type InitialStateType = {
    messageForNewPost: string
    dialogsData: Array<DiaologPropsType>
    postData: Array<PostDataTypes>
}

const profileReducer = (state: InitialStateType, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostDataTypes = {
                id: new Date().getTime(),
                message: action.postText,
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

