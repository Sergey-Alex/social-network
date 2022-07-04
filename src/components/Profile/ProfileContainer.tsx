import React, {Component} from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";


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
type MapStateToPropsType = {
    profile: ProfileContainerType | null
}
type mapDispatchToProps = {
    setUserProfile: (profile:ProfileContainerType) => void
}

type PathParamType = {
    userId: string
}

export type OwnProfilePageType = MapStateToPropsType & mapDispatchToProps

type CommonPropsType = RouteComponentProps<PathParamType> & OwnProfilePageType

class ProfileContainer extends Component<CommonPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {userId = '2'}
        axios.get<ProfileContainerType>(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
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
let mapStateToProps = (state:AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

let withRouterProfileContainer = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    setUserProfile
})(withRouterProfileContainer)