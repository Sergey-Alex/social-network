import React from 'react';
import {connect} from "react-redux";
import {
    followSuccess, followTC, getUsersThunkCreator,
    setCurrentPage, setToggleIsFetching,
    setTotalUserCount,
    setUsers, toggleIsFollowingProgress, unFollowSuccess, unFollowTC,
    UsersType
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";


type MapStatePropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]

}


class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)

    }


    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   onPageChanged={this.onPageChanged}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   unFollow={this.props.unFollow}
                   Follow={this.props.Follow}
                   toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                   followingInProgress={this.props.followingInProgress}
                   followTC={this.props.followTC}
                   unFollowTC={this.props.unFollowTC}
            />
        </>
    }
}

    type MapDispatchToPropsType = {
        Follow: (userId: number) => void
        unFollow: (userId: number) => void
        setUsers: (users: Array<UsersType>) => void
        setCurrentPage: (currentPage: number) => void
        setTotalUserCount: (totalUsers: number) => void
        setToggleIsFetching: (isFetching: boolean) => void
        toggleIsFollowingProgress: (followingInProgress: boolean, id: number) => void
        getUsers: (currentPage: number, pageSize: number) => void
        followTC: (id: number) => void
        unFollowTC: (id: number) => void
    }

export type UsersPropsType = MapDispatchToPropsType & MapStatePropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,

    }

}

//let withRedirect = withAuthRedirect(UsersContainer)
export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        Follow: followSuccess,
        unFollow: unFollowSuccess,
        setUsers,
        setCurrentPage,
        setTotalUserCount,
        setToggleIsFetching,
        toggleIsFollowingProgress,
        getUsers: getUsersThunkCreator,
        followTC,
        unFollowTC
    }),
    withAuthRedirect
)(UsersContainer)


