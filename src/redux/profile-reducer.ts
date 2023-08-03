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
    | ReturnType<typeof savePhotoSuccessAC>

const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const CHANGE_PHOTO = 'CHANGE_PHOTO'

export const AddPostAC = (values: string) => {
    return {type: ADD_POST, values} as const
}
export const setUserProfile = (profile: ProfileContainerType) => {
    return {type: SET_USER_PROFILE, profile} as const
}

export const ChangeNewTextAC = (newText: string) => {
    return {type: CHANGE_NEW_POST_TEXT, newText: newText} as const
}
export const setStatusAC = (status: string) => {
    return {type: SET_STATUS, status: status} as const
}
export const savePhotoSuccessAC = (file: {small: string, large:string}) => {
    return {type: CHANGE_PHOTO, file} as const
}

export type InitialStateType = {
    postData: Array<PostDataTypes>
    profile: ProfileContainerType | null | any,
    status: string
}
let initialState: InitialStateType = {
    postData: [
        {id: 1, message: 'Hi it work111 ', likesCount: 12},
        {id: 2, message: 'Hi it work222', likesCount: 100},
        {id: 3, message: 'Hi it work333', likesCount: 200},

    ],
    profile: '',
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
        case CHANGE_PHOTO:
            return  {...state, profile: {...state.profile, photos:action.file }}
        default:
            return state
    }
}

export const getProfileTC = (userId: number): AppThunk => async (dispatch) => {
    const res = await profileApi.getProfile(userId)
    dispatch(setUserProfile(res))
}

export const getStatusTC = (userId: number): AppThunk => async (dispatch) => {
    let res = await profileApi.getStatus(userId)
    dispatch(setStatusAC(res))
}

export const UpdateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let res = await profileApi.updateStatus(status)
    if (res.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}
export const savePhoto = (photo: string) => async (dispatch: Dispatch) => {
    let res = await profileApi.savePhoto(photo)
  //  console.log(typeof(res.data.photos.small))
    if (res.resultCode === 0) {
        dispatch(savePhotoSuccessAC(res.data.photos))
    }
}

export default profileReducer

