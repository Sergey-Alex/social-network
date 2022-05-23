import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import {addPost, changeNewText, StatePropsType} from './state';
import {BrowserRouter} from "react-router-dom";


export const renderTree = (state: StatePropsType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} changeNewText={changeNewText} addPost={addPost} />
        </BrowserRouter>,
        document.getElementById('root')
    );
}