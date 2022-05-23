import React from 'react';
import MyPost  from "./MyPosts/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, PostDataTypes} from "../../redux/state";

type ProfilePostData = {
    postData: Array<PostDataTypes>
    addPost: (t: string) => void
}

const Profile = ({postData, addPost}: ProfilePostData) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPost addPost={addPost} postData = {postData}/>
        </div>

    );
};

export default Profile;