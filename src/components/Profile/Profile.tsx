import React from 'react';
import MyPost from "./MyPosts/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, changeNewText, PostDataTypes} from "../../redux/state";

type ProfilePostData = {
    postData: Array<PostDataTypes>
    addPost: (t: string) => void
    message: string
    changeNewText: (text: string) => void
}

const Profile = ({postData, addPost, message, changeNewText}: ProfilePostData) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPost changeNewText={changeNewText} addPost={addPost} postData={postData} message={message}/>
        </div>

    );
};

export default Profile;