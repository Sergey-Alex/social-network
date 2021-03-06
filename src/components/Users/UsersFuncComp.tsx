import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import classes from './Users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/img.png'

const UsersFuncComp = (props: UsersPropsType) => {
        const getUsers = () => {
            if (props.users.length === 0) {
                axios.get('https://social-network.samuraijs.com/api/1.0/users')
                    .then(res => props.setUsers(res.data.items))
            }
        }

    return (
        <div>
            {
                props.users.map(user => <div className={classes.user} key={user.id}>
                    <span>
                        <div><img className={classes.userPhoto} src={user.photos.small !== null ? user.photos.small : userPhoto} alt=""/>
                        </div>
                        <div>
                            {
                                user.followed
                                    ? <button onClick={() => {
                                        props.unFollow(user.id)
                                    }}>UnFollow</button>
                                    : <button onClick={() => {
                                        props.Follow(user.id)
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

export default UsersFuncComp;
