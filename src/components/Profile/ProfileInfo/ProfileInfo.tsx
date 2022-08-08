import React from 'react';
import classes from './ProfileInfo.module.css'
import {ProfileContainerType} from "../ProfileContainer";
import Preloader from "../../common/preloader/Preloader";
import searchWorkIcon from '../../../assets/images/looking-for-job.svg'
import ProfileStatus from './ProfileStatus'


type ProfileInfoType = {
    profile: ProfileContainerType

}


const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) return <Preloader/>


    return (
        <div>
            <img
                className={classes.img}
                src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                alt=""/>

            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.small} alt="photos"/>

                    <div>{props.profile.fullName}</div>
                    <div>{props.profile.aboutMe}</div>
                    <div>{props.profile.contacts.twitter}</div>
                    <div>{props.profile.lookingForAJob}</div>
                    <div>{props.profile.lookingForAJobDescription}</div>
               <span>Статус поиска работы :</span> {props.profile.lookingForAJob && <img src={searchWorkIcon} alt={'search work'} style={{height:'50px'}}/>}
                <ProfileStatus status='Hello its my status'/>
            </div>
        </div>

    );
};

export default ProfileInfo;