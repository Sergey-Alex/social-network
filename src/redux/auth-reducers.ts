import {Dispatch} from "redux";
import {AuthApi} from "../api/api";

export type ActionsTypeAuth = ReturnType<typeof setAuthUserData>

const SET_USER_DATA = 'SET_USER_DATA'

export const setAuthUserData = (id: number, email: string, login: string) => {
    return {type: SET_USER_DATA, data: {id, email, login}} as const
}
type DataType = {
    id: number
    email: string
    login: string
}


type InitialStateType = {
    data: DataType
    isAuth: boolean
}

let initialState: InitialStateType = {
    data: {
        id: 0,
        email: '',
        login: '',

    },
    isAuth: false

}

const authReducer = (state: InitialStateType = initialState, action: ActionsTypeAuth): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state, data: {...action.data},
                isAuth: true
            }
        default:
            return state
    }

}

export const authTC = () => {
    return (dispatch: Dispatch<ActionsTypeAuth>) => {
        AuthApi.authMe().then((res) => {
            let {id, email, login} = res.data
            if (res.resultCode === 0){
                dispatch(setAuthUserData(id, email, login))
            }
        })
    }
}


export default authReducer