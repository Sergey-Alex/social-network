import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileTC} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";


type Contacts = {
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    website: string
    youtube: string
}

export type ProfileContainerType = {
    aboutMe: string
    contacts: Contacts
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: {
        large: string
        small: string
    }
    userId: number


}
type MapStateToPropsType = {
    profile: ProfileContainerType | null
    isAuth: boolean

}
type mapDispatchToProps = {
    getProfileTC: (id: number) => void
}

type PathParamType = {
    userId: string
}

export type OwnProfilePageType = MapStateToPropsType & mapDispatchToProps

type CommonPropsType = RouteComponentProps<PathParamType> & OwnProfilePageType

class ProfileContainer extends Component<CommonPropsType> {

    componentDidMount() {

        let userId = +this.props.match.params.userId
        if (!userId) {
            userId = 2
        }
        this.props.getProfileTC(userId)
    }

    render() {
      //  debugger
        if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return (
            <div>
                {this.props.profile && <Profile profile={this.props.profile}/>}
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let withRouterProfileContainer = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    getProfileTC
})(withRouterProfileContainer)