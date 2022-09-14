
import {addMessageDialogAC} from "./dialogs-reducer";
import {ProfileContainerType} from "../components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {profileApi} from "../api/api";
import {AppThunk} from "./redux-store";


export type PostDataTypes = {
    id: number
    message: string
    likesCount: number
}
export type ActionsProfileType =
    ReturnType<typeof AddPostAC>
    | ReturnType<typeof ChangeNewTextAC>
    | ReturnType<typeof addMessageDialogAC>
  //  | ReturnType<typeof ChangeMessageDialogsAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatusAC>

const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

export const AddPostAC = (values:string) => {
    return {type: ADD_POST, values} as const
}
export const setUserProfile = (profile:ProfileContainerType) => {
    return {type: SET_USER_PROFILE, profile} as  const
}

export const ChangeNewTextAC = (newText: string) => {
    return {type: CHANGE_NEW_POST_TEXT, newText: newText} as const
}
export const setStatusAC = (status: string) => {
    return {type: SET_STATUS, status: status} as const
}

export type InitialStateType = {

    postData: Array<PostDataTypes>
    profile:  ProfileContainerType | null,
    status: string
}
let initialState : InitialStateType = {
    postData: [
        {id: 1, message: 'Hi it work111 ', likesCount: 12},
        {id: 2, message: 'Hi it work222', likesCount: 100},
        {id: 3, message: 'Hi it work333', likesCount: 200},

    ],
    profile: null,
    status: ''
}

const profileReducer = (state: InitialStateType = initialState, action: ActionsProfileType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostDataTypes = {
                id: new Date().getTime(),
                message: action.values,
                likesCount: 0
            }
            return {...state, postData: [...state.postData, newPost]}
        // case CHANGE_NEW_POST_TEXT:
        //     return {...state, messageForNewPost: action.newText}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}

export const getProfileTC = (userId: number) :AppThunk => {
    return (dispatch) => {
        profileApi.getProfile(userId).then((res) => {
            dispatch(setUserProfile(res))
        })
    }
}

export const getStatusTC = (userId: number): AppThunk => {
    return (dispatch) => {
        profileApi.getStatus(userId).then((res) => {
            dispatch(setStatusAC(res))
        })
    }
}

export const UpdateStatusTC = (status: string) => {
    return (dispatch: Dispatch) => {
        profileApi.updateStatus(status).then((res) => {
            if (res.resultCode === 0){
                // dispatch(getStatusTC(res.data.status))//{}
                dispatch(setStatusAC(status))
            }

        })
    }
}

export default profileReducer

