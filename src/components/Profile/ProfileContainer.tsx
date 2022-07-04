import React, {Component} from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";


type Contacts = {
    github:  string
    instagram:  string
    mainLink:  string
    twitter:  string
    vk:  string
    website:  string
    youtube:  string
}

export type ProfileContainerType = {
    aboutMe: string
    contacts: Contacts
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription:string
    photos: {
        large: string
        small: string
    }
    userId: number


}

export type ProfilePageType = {
    setUserProfile: (profile:ProfileContainerType) => void
    profile: ProfileContainerType | null
}


class ProfileContainer extends Component<ProfilePageType> {

    componentDidMount() {
        axios.get<ProfileContainerType>(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(res => {
                this.props.setUserProfile(res.data)
            })
    }



    render() {
        return (
            <div>
                {this.props.profile && <Profile profile={this.props.profile}/>}
            </div>
        );
    }
}
let mapStateToProps = (state:AppStateType) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {
    setUserProfile
})(ProfileContainer)