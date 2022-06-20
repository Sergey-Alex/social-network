import React from 'react';
import {ActionsType, PostDataTypes} from "../../../redux/store";
import {AddPostAC, ChangeNewTextAC} from "../../../redux/profile-reducer";
import MyPost, {MyPostsPropsType} from "./MyPost";
import {StoreType} from "../../../redux/redux-store";
import StoreContext from '../../../StoreContext';

type MyPostContainerType = {
    postData: Array<PostDataTypes>
    message: string
    dispatch: (action: ActionsType) => void
    store: StoreType
}


const MyPostContainer = () => {

    return <StoreContext.Consumer>
        {
            (store) => {
                const addPostHandlerContainer = (message: string) => {
                    store.dispatch(AddPostAC(message))
                }

                const changeTextHandlerContainer = (text: string) => {
                    store.dispatch(ChangeNewTextAC(text))
                }
               return <MyPost postData={store.getState().profilePage.postData}
                        message={store.getState().profilePage.messageForNewPost}
                        addPostHandlerContainer={addPostHandlerContainer}
                        changeTextHandlerContainer={changeTextHandlerContainer}/>
            }
        }
        </StoreContext.Consumer>
}
export default MyPostContainer;