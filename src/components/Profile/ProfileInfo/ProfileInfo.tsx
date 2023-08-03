import React from 'react';
import classes from './ProfileInfo.module.css'
import {ProfileContainerType} from "../ProfileContainer";
import Preloader from "../../common/preloader/Preloader";
import searchWorkIcon from '../../../assets/images/looking-for-job.svg'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/User-Account-PNG-Clipart.png'


type ProfileInfoType = {
    profile: ProfileContainerType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
}


const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) return <Preloader/>

    const onMainPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            props.savePhoto(e.currentTarget.files[0]);
        }
    }
    return (
        <div>
            <img
                className={classes.img}
                src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                alt=""/>

            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.small || userPhoto} alt="photos" className={classes.mainPhoto}/>

                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
                <div>{props.profile.contacts.twitter}</div>
                <div>{props.profile.lookingForAJob}</div>
                <div>{props.profile.lookingForAJobDescription}</div>
                <span>Статус поиска работы :</span> {props.profile.lookingForAJob &&
                <img src={searchWorkIcon} alt={'search work'} style={{height: '50px'}}/>}
                {props.isOwner && <input type='file' onChange={onMainPhotoSelect}/>}
                <ProfileStatusWithHooks updateStatus={props.updateStatus} status='Hello !!'/>
                <div>{props.status}</div>
            </div>
        </div>

    );
};

export default ProfileInfo;
