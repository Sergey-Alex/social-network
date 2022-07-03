import React from 'react';
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUserCountAC,
    setUsersAC,
    unFollowAC,
    UsersType
} from "../../redux/users-reducer";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";

import axios from "axios";
import Users from "./Users";



type MapStatePropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
}
class UsersContainer extends React.Component<UsersPropsType>{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items);
                this.props.setTotalUserCount(res.data.totalCount)
            })

    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(res => this.props.setUsers(res.data.items))

    }

    render() {

        return  <Users totalUsersCount ={this.props.totalUsersCount}
                       onPageChanged = {this.onPageChanged}
                       pageSize = {this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users = {this.props.users}
                       unFollow = {this.props.unFollow}
                       Follow = {this.props.Follow}

        />
    }
}

type MapDispatchToPropsType = {
    Follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUserCount: (totalUsers: number) => void
}

export type UsersPropsType = MapDispatchToPropsType & MapStatePropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }

}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        Follow: (userId:number) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage)=> {
            dispatch(setCurrentPageAC(currentPage))
        },
       setTotalUserCount: (totalUsers) => {
            dispatch(setTotalUserCountAC(totalUsers))
       }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
