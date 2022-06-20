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

const Profile = () => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostContainer/>
        </div>

    );
};

export default Profile;