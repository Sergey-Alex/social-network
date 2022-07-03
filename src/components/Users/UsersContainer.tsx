import React from 'react';
import {connect} from "react-redux";
import {
    Follow,
    setCurrentPage, setToggleIsFetching,
    setTotalUserCount,
    setUsers, unFollow,
    UsersType
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";


type MapStatePropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.setToggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setToggleIsFetching(false)
                this.props.setUsers(res.data.items);
                this.props.setTotalUserCount(res.data.totalCount)
            })

    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.setToggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setToggleIsFetching(false)
                this.props.setUsers(res.data.items)
            })


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

}

export type UsersPropsType = MapDispatchToPropsType & MapStatePropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
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
    Follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalUserCount,
    setToggleIsFetching,
})(UsersContainer);
