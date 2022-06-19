import React from 'react';
import {ActionsType, PostDataTypes} from "../../../redux/store";
import {AddPostAC, ChangeNewTextAC} from "../../../redux/profile-reducer";
import MyPost, {MyPostsPropsType} from "./MyPost";
import {StoreType} from "../../../redux/redux-store";

type MyPostContainerType = {
    postData: Array<PostDataTypes>
    message: string
    dispatch: (action: ActionsType) => void
    store: StoreType
}



const MyPostContainer = (props: MyPostContainerType) => {

    const addPostHandlerContainer = (message: string) => {
        props.store.dispatch(AddPostAC(message))
    }

    const changeTextHandlerContainer = (text: string) => {
        props.store.dispatch(ChangeNewTextAC(text))
    }

    return <div>
           <MyPost postData={props.postData}
                   message={props.message}
                   addPostHandlerContainer={addPostHandlerContainer}
                   changeTextHandlerContainer={changeTextHandlerContainer}/>
        </div>

}
export default MyPostContainer;