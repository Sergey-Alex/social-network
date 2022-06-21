import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


let reducers = combineReducers({
    profilePage:profileReducer,
    messagePage:dialogsReducer,
    sidebar:sidebarReducer
})
let store = createStore(reducers);

export type StoreType = typeof store

export type AppStateType = ReturnType<typeof reducers>

export default store