import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPosts/MyPostContainer";
import {ProfileContainerType} from "./ProfileContainer";

type ProfilePropsType = {
    updateStatus: (status: string) => void;
    profile: ProfileContainerType
    status: string
    isOwner: boolean
    savePhoto: (photo:File) => void

}

const Profile = (props:ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile = {props.profile}
                         status = {props.status}
                         updateStatus = {props.updateStatus}
                         isOwner = {props.isOwner}
                         savePhoto={props.savePhoto}
            />
            <MyPostContainer/>
        </div>

    );
};

export default Profile;
