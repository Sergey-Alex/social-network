import React from 'react';

import {AddPostAC, ChangeNewTextAC, PostDataTypes} from "../../../redux/profile-reducer";

import {AppStateType} from "../../../redux/redux-store";

import {Dispatch} from "redux";
import {connect} from "react-redux";
import Profile from "../Profile";
import MyPost from "./MyPost";


// type MyPostContainerType = {
//     postData: Array<PostDataTypes>
//     message: string
//     dispatch: (action: ActionsType) => void
//     store: StoreType
// }




    // return <StoreContext.Consumer>
    //     {
    //         (store) => {
    //             const addPostHandlerContainer = (message: string) => {
    //                 store.dispatch(AddPostAC(message))
    //             }
    //
    //             const changeTextHandlerContainer = (text: string) => {
    //                 store.dispatch(ChangeNewTextAC(text))
    //             }
    //            return <MyPost postData={store.getState().profilePage.postData}
    //                     message={store.getState().profilePage.messageForNewPost}
    //                     addPostHandlerContainer={addPostHandlerContainer}
    //                     changeTextHandlerContainer={changeTextHandlerContainer}/>
    //         }
    //     }
    //     </StoreContext.Consumer>


type MapStatePropsType = {
    message: string
    messageForNewPost: string
    postData: Array<PostDataTypes>
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        messageForNewPost: state.profilePage.messageForNewPost,
        postData: state.profilePage.postData,
        message: state.profilePage.messageForNewPost
    }
}

type MapDispatchPropsType = {
    addPostHandlerContainer: () => void
    changeTextHandlerContainer: (text: string) => void
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPostHandlerContainer: () => {
            dispatch(AddPostAC())
        },
        changeTextHandlerContainer: (text: string) => {
            dispatch(ChangeNewTextAC(text))
        }
    }
}

export const  MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);