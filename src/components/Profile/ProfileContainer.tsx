import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileTC, getStatusTC, UpdateStatusTC} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";


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
    profile: ProfileContainerType | null,
    status: string
    //isAuth: boolean

}
type mapDispatchToProps = {
    getProfileTC: (id: number) => void
    getStatusTC: (id: number) => void
    UpdateStatusTC:(status: string) => void
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
            userId = 3
        }
        this.props.getProfileTC(userId)
        this.props.getStatusTC(userId)
        this.props.UpdateStatusTC(this.props.status)
    }

    render() {
      //  debugger
   //     if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return (
            <div>
                {this.props.profile && <Profile profile={this.props.profile}
                                                status = {this.props.status}
                                                updateStatus ={this.props.UpdateStatusTC}
                />}
            </div>
        );
    }
}

//const AuthRedirectComponent =

//     (props: any) => {
//     if (!props.isAuth) return <Redirect to={'/login'}/>
//     return  <ProfileContainer {...props} />
// }


let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export  default  compose<React.ComponentType>(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {
        getProfileTC,
        getStatusTC,
        UpdateStatusTC
    })
)(ProfileContainer)

//let withRouterProfileContainer = withRouter(withAuthRedirect(ProfileContainer))

// export default withRouter(withAuthRedirect(connect(mapStateToProps, {
//     getProfileTC
// })(ProfileContainer)))