import {AppThunk} from "./redux-store";
import {authTC} from "./auth-reducers";

export type InitializedActionsTypeApp = ReturnType<typeof initializedSuccessAppAC>

const SET_INITIALIZED = 'SET_INITIALIZED'


export const initializedSuccessAppAC = () => {
    return {type: SET_INITIALIZED,} as const
}


export type AppInitialStateType = {
    initialized: boolean
}

let initialState: AppInitialStateType = {
    initialized: false
}

const appReducer = (state: AppInitialStateType = initialState, action: InitializedActionsTypeApp): AppInitialStateType => {

    switch (action.type) {
        case SET_INITIALIZED :
            return {
                ...state, initialized: true
            }

        default:
            return state
    }

}

export const initializedAppTC = (): AppThunk => async (dispatch) => {
    const user = await dispatch(authTC())
    Promise.all([user]).then(() => {
        dispatch(initializedSuccessAppAC())
    })

}

export default appReducer
