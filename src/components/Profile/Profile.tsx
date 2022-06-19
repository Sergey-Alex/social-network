import React from 'react';
import MyPost from "./MyPosts/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsType, PostDataTypes, StatePropsType} from "../../redux/store";
import MyPostContainer from "./MyPosts/MyPostContainer";
import {StoreType} from "../../redux/redux-store";

type ProfilePostData = {
    postData: Array<PostDataTypes>
    message: string
    dispatch: (action: ActionsType) => void
    store: StoreType
}

const Profile = ({postData, dispatch, message, store}: ProfilePostData) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostContainer store = {store}  dispatch={dispatch}  postData={postData} message={message}/>
        </div>

    );
};

export default Profile;