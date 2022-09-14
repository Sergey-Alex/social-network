import {Dispatch} from "redux";
import {AuthApi, TypeArgsLogin} from "../api/api";
import {AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";

export type ActionsTypeAuth = ReturnType<typeof setAuthUserData>

const SET_USER_DATA = 'SET_USER_DATA'


export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {type: SET_USER_DATA, payload: {id, email, login, isAuth}} as const
}

type DataType = {
    id: number | null
    email: string | null
    login: string | null
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
    isAuth: false,
}

const authReducer = (state: InitialStateType = initialState, action: ActionsTypeAuth): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state, data: {
                    ...state.data, id: action.payload.id, email: action.payload.email, login: action.payload.login
                },
                isAuth: action.payload.isAuth

            }

        default:
            return state
    }

}

export const authTC = (): AppThunk => {
    return (dispatch) => {
        AuthApi.authMe().then((res) => {
            let {id, email, login} = res.data
            if (res.resultCode === 0) {
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
    }
}

export const loginMeTc = (data: TypeArgsLogin): AppThunk => {
    console.log(data)
    return (dispatch) => {
        AuthApi.loginMe(data)
            .then((res) => {
                console.log(res)
                if (res.resultCode === 0) {
                    dispatch(authTC())
                } else {
                   let message = res.messages.length > 0 ? res.messages : 'some err'
                    let action: any = stopSubmit('login', {_error: message})
                    dispatch(action)
                }
            })
    }
}

export const loginOutTC = (): AppThunk => {
    return (dispatch) => {
        AuthApi.logoutMe()
            .then((res) => {
                dispatch(setAuthUserData(null, null, null, false))
            })
    }
}


export default authReducer