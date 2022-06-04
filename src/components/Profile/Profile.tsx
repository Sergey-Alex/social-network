import React from 'react';
import MyPost from "./MyPosts/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsType, PostDataTypes} from "../../redux/state";

type ProfilePostData = {
    postData: Array<PostDataTypes>
    message: string
    dispatch: (action: ActionsType) => void
}

const Profile = ({postData, dispatch, message}: ProfilePostData) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPost dispatch={dispatch} postData={postData} message={message}/>
        </div>

    );
};

export default Profile;