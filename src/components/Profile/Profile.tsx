import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPosts/MyPostContainer";
import {ProfileContainerType} from "./ProfileContainer";

type ProfilePropsType = {
    profile: ProfileContainerType
}

const Profile = (props:ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile = {props.profile}/>
            <MyPostContainer/>
        </div>

    );
};

export default Profile;