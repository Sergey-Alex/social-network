import React from 'react';
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/img.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";



type UserTypeComponent = {
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    Follow: (userId: number) => void
    unFollow: (userId: number) => void
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
                    onClick={(e) => props.onPageChanged(p)}
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
                                    ? <button onClick={() => {
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0//follow/${user.id}`,  {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": 'fb758589-2463-42a0-929e-f4166fe20e45'
                                            }
                                        })
                                            .then(res => {
                                                if (res.data.resultCode === 0) {
                                                    props.unFollow(user.id)
                                                }

                                            })
                                        props.unFollow(user.id)
                                    }}>UnFollow</button>
                                    : <button onClick={() => {
                                        axios.post(`https://social-network.samuraijs.com/api/1.0//follow/${user.id}`, {}, {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": 'fb758589-2463-42a0-929e-f4166fe20e45'
                                            }
                                        })
                                            .then(res => {
                                                if (res.data.resultCode === 0) {
                                                    props.Follow(user.id)
                                                }

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
