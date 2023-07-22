import {applyMiddleware, combineReducers, createStore,compose} from "redux";
import profileReducer, {ActionsProfileType} from "./profile-reducer";
import dialogsReducer, {DialogsActionsType} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersActionType} from "./users-reducer";
import authReducer, {ActionsTypeAuth} from "./auth-reducers";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form';
import appReducer, {InitializedActionsTypeApp} from "./app-reducer";

const reducer = combineReducers({
    profilePage:profileReducer,
    messagePage:dialogsReducer,
    sidebar:sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    appInit: appReducer
})



//export type StoreType = typeof store
 const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose
//     (typeof window !== 'undefined' &&
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//     compose;

const store = createStore(reducer,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeEnhancers(applyMiddleware(thunkMiddleware)));
export type AppActionsType = ActionsTypeAuth | UsersActionType |  DialogsActionsType | ActionsProfileType | InitializedActionsTypeApp
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>
export type AppStateType = ReturnType<typeof reducer>
// @ts-ignore
window.__store__ = store
export default store
