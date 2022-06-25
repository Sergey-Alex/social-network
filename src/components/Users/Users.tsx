import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import classes from './Users.module.css'

const Users = (props: UsersPropsType) => {

    if (props.users.length === 0) {
        props.setUsers([
                {
                    id: 1,
                    photoUrl: 'https://png.pngtree.com/element_our/png_detail/20181206/users-vector-icon-png_260862.jpg',
                    followed: false,
                    fullName: 'Sergio',
                    status: 'i am boss',
                    location: {city: 'Minsk', country: 'Belarus'}
                },
                {
                    id: 2,
                    photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiXiaFDvuEOMuoyhYqbYu3YbBVAQfcIp7QosQDBy9fWyKqlaMpEjCSLRfnoUDc1X5X_PQ&usqp=CAU',
                    followed: false,
                    fullName: 'Semen',
                    status: 'i am not boss',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: 3,
                    photoUrl: 'https://images.freeimages.com/images/premium/previews/2092/20923708-lady-user-icon.jpg',
                    followed: false,
                    fullName: 'Maria',
                    status: 'i am not boss',
                    location: {city: 'Kiev', country: 'Ukraine'}
                }
        ])


    }
    return (
        <div>
            {
                props.users.map(user => <div className={classes.user} key={user.id}>
                    <span>
                        <div><img className={classes.userPhoto} src={user.photoUrl} alt=""/>
                        </div>
                        <div>
                            {
                                user.followed
                                    ? <button onClick={() => {
                                        props.unFollow(user.id)
                                    }}>UnFollow</button>
                                    : <button onClick={() => {
                                        props.follow(user.id)
                                    }}>Follow</button>
                            }

                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.fullName}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{user.location.country}</div>
                            <div>{user.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    );
};

export default Users;
