import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ActionsProfileType} from "./profile-reducer";
import dialogsReducer, {DialogsActionsType} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersActionType} from "./users-reducer";
import authReducer, {ActionsTypeAuth} from "./auth-reducers";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form';

const reducer = combineReducers({
    profilePage:profileReducer,
    messagePage:dialogsReducer,
    sidebar:sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store
//export type StoreType = typeof store

export type AppActionsType = ActionsTypeAuth | UsersActionType |  DialogsActionsType | ActionsProfileType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>
export type AppStateType = ReturnType<typeof reducer>

export default store