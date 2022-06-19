import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Diaologs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route} from 'react-router-dom';
import store, {StoreType} from "./redux/redux-store";
import DialogsContainer from "./components/Dialogs/DiaologsContainer";



export type AppProps = {
    store: StoreType
}

function App(props: AppProps) {
    const state = props.store.getState()

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer dialogsData={state.profilePage.dialogsData}
                                                  message={state.messagePage.message}
                                                   dialogMessage={state.messagePage.newDialogMessage}
                                                  dispatch = {props.store.dispatch.bind(props.store)}
                                                  store = {store}
                           />}
                    />
                    <Route path='/profile' render={() => <Profile
                        message={state.profilePage.messageForNewPost}
                        dispatch={props.store.dispatch.bind(props.store)}
                        postData={state.profilePage.postData}
                        store = {store}

                    />}
                    />
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
