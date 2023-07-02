import React from 'react';
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/img.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";


type UserTypeComponent = {
    user: UsersType
    followingInProgress: number[]
    unFollowTC: (id: number) => void
    followTC: (id: number) => void
}


const User = (props: UserTypeComponent) => {
    return (
        <>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + props.user.id}>
                                 <img className={classes.userPhoto}
                                      src={props.user.photos.small !== null ? props.user.photos.small : userPhoto} alt=""/>
                            </NavLink>
                        </div>
                        <div>
                            {
                                props.user.followed
                                    ? <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                              onClick={() => {
                                                  props.unFollowTC(props.user.id)
                                              }}
                                        // props.toggleIsFollowingProgress(true, user.id)
                                        // FollowedApi.unFollowUser(user.id).then((res) => {
                                        //     props.unFollow(user.id)
                                        //     props.toggleIsFollowingProgress(false, user.id)
                                        // })

                                    >UnFollow</button>
                                    : <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                              onClick={() => {
                                                  props.followTC(props.user.id)
                                              }}
                                        // props.toggleIsFollowingProgress(true, user.id)
                                        // FollowedApi.followUser(user.id).then((res) => {
                                        //     props.Follow(user.id)
                                        //     props.toggleIsFollowingProgress(false, user.id)
                                        // })
                                    >Follow</button>
                            }

                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{props.user.name}</div>
                            <div>{props.user.status}</div>
                        </span>
                        <span>
                            <div>{'user.location.country'}</div>
                            <div>{'user.location.city'}</div>
                        </span>
                    </span>
        </>
    );
};

export default User;


