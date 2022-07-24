import {Dispatch} from "redux";
import {AuthDataType} from "../components/Header/HeaderContainer";
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
                isAuth : true
            }
        default:
            return state
    }

}
// const authMe = async () => {
//     try {
//         const response = await AuthApi.authMe()
//         if (response.resultCode === 0){
//             //...что то делаем
//         } else {
//             // делаем что то еще
//         }
//     }catch(err) {
//         throw new Error(err.data.message[0])
//     }
// }

export const authTC = () => {
    return(dispatch: Dispatch<ActionsTypeAuth>) => {
        AuthApi.authMe().then((res) => {
            let {id, email, login} = res.data
           dispatch(setAuthUserData(id, email, login))
        })
    }
}


export default authReducer