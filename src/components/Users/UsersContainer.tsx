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
import {userApi} from "../../api/api";


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
        // this.props.setToggleIsFetching(true)
        //     userApi.getUsers(this.props.currentPage, this.props.pageSize).then((res) => {
        //         this.props.setToggleIsFetching(false)
        //         this.props.setUsers(res.items);
        //         this.props.setTotalUserCount(-res.totalCount)
        //     })

    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)

        // this.props.setCurrentPage(pageNumber)
        // this.props.setToggleIsFetching(true)
        //     userApi.getUsers(pageNumber, this.props.pageSize).then((res) => {
        //         this.props.setToggleIsFetching(false)
        //         this.props.setUsers(res.items)
        //     })


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

// let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
//     return {
//         Follow: (userId: number) => {
//             dispatch(Follow(userId))
//         },
//         unFollow: (userId) => {
//             dispatch(unFollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsers(users))
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPage(currentPage))
//         },
//         setTotalUserCount: (totalUsers) => {
//             dispatch(setTotalUserCount(totalUsers))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(setToggleIsFetching(isFetching))
//         }
//     }
//
// }

export default connect(mapStateToProps, {
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
})(UsersContainer);
