import React from 'react';
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/img.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {FollowedApi} from "../../api/api";


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
}


const Users = (props: UserTypeComponent) => {
    let pagesCount: number = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(p => <span
                    onClick={() => props.onPageChanged(p)}
                    className={(p === props.currentPage) ? classes.selectedPage : ''}>{p}</span>)}
            </div>
            {
                props.users.map((user) => <div className={classes.user} key={user.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                 <img className={classes.userPhoto}
                                      src={user.photos.small !== null ? user.photos.small : userPhoto} alt=""/>
                            </NavLink>

                        </div>
                        <div>
                            {
                                user.followed
                                    ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                                              onClick={() => {
                                                  props.toggleIsFollowingProgress(true, user.id)
                                                  FollowedApi.unFollowUser(user.id).then((res) => {
                                                      props.unFollow(user.id)
                                                      props.toggleIsFollowingProgress(false, user.id)
                                                  })

                                              }}>UnFollow</button>
                                    : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                              onClick={() => {
                                                  props.toggleIsFollowingProgress(true, user.id)
                                                  FollowedApi.followUser(user.id).then((res) => {
                                                      props.Follow(user.id)
                                                      props.toggleIsFollowingProgress(false, user.id)
                                                  })
                                              }}>Follow</button>
                            }

                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'user.location.country'}</div>
                            <div>{'user.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    );
};

export default Users;
