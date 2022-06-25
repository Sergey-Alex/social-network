import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {followAC, setUsersAC, unFollowAC, UsersType} from "../../redux/users-reducer";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
    users: Array<UsersType>
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
}

export type UsersPropsType = MapDispatchToPropsType & MapStatePropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users
    }

}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: Array<UsersType>) => {
            dispatch(setUsersAC(users))
        }

    }

}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
