import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPosts/MyPostContainer";
import {ProfileContainerType} from "./ProfileContainer";

type ProfilePropsType = {
    updateStatus: (status: string) => void;
    profile: ProfileContainerType
    status: string
}

const Profile = (props:ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile = {props.profile} status = {props.status}
                         updateStatus = {props.updateStatus}/>
            <MyPostContainer/>
        </div>

    );
};

export default Profile;