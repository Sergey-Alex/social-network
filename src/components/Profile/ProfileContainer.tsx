import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileTC, getStatusTC, savePhoto, UpdateStatusTC} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
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
    aboutMe: string | null
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
    status: string
    autorizedUserId: number
    isAuth: boolean
 //   savePhoto: (photo: File) => void
}
type mapDispatchToProps = {
    getProfileTC: (id: number) => void
    getStatusTC: (id: number) => void
    UpdateStatusTC: (status: string) => void
    savePhoto: (photo: File) => void
}

type PathParamType = {
    userId: string
}

export type OwnProfilePageType = MapStateToPropsType & mapDispatchToProps

type CommonPropsType = RouteComponentProps<PathParamType> & OwnProfilePageType

class ProfileContainer extends Component<CommonPropsType> {
    refreshProfile() {
        let userId = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.autorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfileTC(userId)
        this.props.getStatusTC(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<CommonPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <div>
                {this.props.profile && <Profile
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.UpdateStatusTC}
                    savePhoto={this.props.savePhoto}
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
    status: state.profilePage.status,
    autorizedUserId: state.auth.data.id,
    isAuth: state.auth.isAuth,


})

export default compose<React.ComponentType>(
    withRouter,
    //  withAuthRedirect,
    connect(mapStateToProps, {
        getProfileTC,
        getStatusTC,
        UpdateStatusTC,
        savePhoto
    })
)(ProfileContainer)

//let withRouterProfileContainer = withRouter(withAuthRedirect(ProfileContainer))

// export default withRouter(withAuthRedirect(connect(mapStateToProps, {
//     getProfileTC
// })(ProfileContainer)))
