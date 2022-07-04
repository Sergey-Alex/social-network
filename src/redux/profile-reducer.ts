
import {addMessageDialogAC, ChangeMessageDialogsAC} from "./dialogs-reducer";
import {ProfileContainerType} from "../components/Profile/ProfileContainer";


export type PostDataTypes = {
    id: number
    message: string
    likesCount: number
}
export type ActionsType =
    ReturnType<typeof AddPostAC>
    | ReturnType<typeof ChangeNewTextAC>
    | ReturnType<typeof addMessageDialogAC>
    | ReturnType<typeof ChangeMessageDialogsAC>
    | ReturnType<typeof setUserProfile>

const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

export const AddPostAC = () => {
    return {type: ADD_POST} as const
}
export const setUserProfile = (profile:ProfileContainerType) => {
    return {type: SET_USER_PROFILE, profile} as  const
}

export const ChangeNewTextAC = (newText: string) => {
    return {type: CHANGE_NEW_POST_TEXT, newText: newText} as const
}

type InitialStateType = {
    messageForNewPost: string
    postData: Array<PostDataTypes>
    profile:  ProfileContainerType | null
}
let initialState : InitialStateType = {
    messageForNewPost: '',
    postData: [
        {id: 1, message: 'Hi it work111 ', likesCount: 12},
        {id: 2, message: 'Hi it work222', likesCount: 100},
        {id: 3, message: 'Hi it work333', likesCount: 200},

    ],
    profile: null
}

const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostDataTypes = {
                id: new Date().getTime(),
                message: state.messageForNewPost,
                likesCount: 0
            }
            return {...state, postData: [...state.postData, newPost], messageForNewPost: ""}
        case CHANGE_NEW_POST_TEXT:
            return {...state, messageForNewPost: action.newText}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state
    }
}

export default profileReducer

