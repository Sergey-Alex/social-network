import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";


const reducer = combineReducers({
    profilePage:profileReducer,
    messagePage:dialogsReducer,
    sidebar:sidebarReducer,
    usersPage: usersReducer
})
const store = createStore(reducer);

// @ts-ignore
window.store = store
//export type StoreType = typeof store

export type AppStateType = ReturnType<typeof reducer>

export default store