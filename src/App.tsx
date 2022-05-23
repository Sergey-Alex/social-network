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
import {addPost, DiaologPropsType, MessageTypeText, PostDataTypes, StatePropsType} from "./redux/state";


export type AppProps = {
    state: StatePropsType,
    addPost: (t: string) =>void

}

function App(props: AppProps) {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <Dialogs dialogsData={props.state.profilePage.dialogsData} message={props.state.messagePage.message}/>}/>
                    <Route path='/profile' render={() => <Profile addPost={props.addPost} postData={props.state.profilePage.postData}/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                     <div>
                         <div className='friends'>{props.state.sidebar.usersFriend}</div>
                     </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
