import {Dispatch} from "redux";
import {AuthApi} from "../api/api";
import {AppThunk} from "./redux-store";

export type ActionsTypeAuth = ReturnType<typeof setAuthUserData> | ReturnType<typeof loginMeAC>

const SET_USER_DATA = 'SET_USER_DATA'
const LOGIN = 'LOGIN'

export const setAuthUserData = (id: number, email: string, login: string) => {
    return {type: SET_USER_DATA, data: {id, email, login}} as const
}

export const loginMeAC = (login: string, password: string, rememberMe: boolean)=>{
    return {type: LOGIN, login, password, rememberMe} as const
}
type DataType = {
    id: number
    email: string
    login: string
}


type InitialStateType = {
    data: DataType
    isAuth: boolean | null
}

let initialState: InitialStateType = {
    data: {
        id: 0,
        email: '',
        login: '',
    },
    isAuth: null


}

const authReducer = (state: InitialStateType = initialState, action: ActionsTypeAuth): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state, data: {...action.data},
                isAuth: true
            }
        case LOGIN:
            return  {...state}
        default:
            return state
    }

}

export const authTC = (): AppThunk => {
    return (dispatch) => {
        AuthApi.authMe().then((res) => {
            let {id, email, login} = res.data
            if (res.resultCode === 0){
                dispatch(setAuthUserData(id, email, login))
            }
        })
    }
}

export const loginMeTc = (login: string, password:string, rememberMe:boolean) :AppThunk => {
    return (dispatch) => {
        AuthApi.loginMe(login, password, rememberMe)
            .then((res)=>{
          if (res.resultCode === 0){

          }
        })
    }
}


export default authReducer