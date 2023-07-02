import React from 'react';
import classes from "./Users.module.css";
import {UsersType} from "../../redux/users-reducer";
import {Pagination} from "./Paginator/Pagination";
import User from "./User";


type UserTypeComponent = {
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    Follow: (userId: number) => void
    unFollow: (userId: number) => void
    toggleIsFollowingProgress: (isFollow: boolean, id: number) => void
    followingInProgress: number[]
    followTC: (id: number) => void
    unFollowTC: (id: number) => void
}


const Users = (props: UserTypeComponent) => {


    return (
        <div>
            <Pagination onPageChanged={props.onPageChanged}
                        pageSize={props.pageSize}
                        totalUsersCount={props.totalUsersCount}
                        currentPage={props.currentPage}
            />
            {
                props.users.map((user) => <div className={classes.user} key={user.id}>
                            <User user={user}
                                  followingInProgress={props.followingInProgress}
                                  unFollowTC={props.unFollowTC}
                                  followTC={props.followTC}/>
                </div>)
            }
        </div>
    );
};

export default Users;


