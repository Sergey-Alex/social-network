import {UsersPropsType} from "./UsersContainer";
import {AppStateType} from "../../redux/redux-store";
import React from "react";
import classes from './Users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/img.png'


class Users extends React.Component<UsersPropsType>{

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
        let pagesCount:number = Math.ceil(this.props.totalUsersCount/this.props.pageSize)
        let pages = []
        for (let i = 1; i<=pagesCount; i++){
            pages.push(i)
        }


        return  <div>
            <div>
                {pages.map(p => <span
                    onClick={(e)=> this.onPageChanged(p)}
                    className={(p === this.props.currentPage) ? classes.selectedPage : ''}>{p}</span>)}
                {/*//спросить у ментора, про типизацию класснэйм*/}
            </div>
            {
                this.props.users.map((user) => <div className={classes.user} key={user.id}>
                    <span>
                        <div><img className={classes.userPhoto} src={user.photos.small !== null ? user.photos.small : userPhoto} alt=""/>
                        </div>
                        <div>
                            {
                                user.followed
                                    ? <button onClick={() => {
                                        this.props.unFollow(user.id)
                                    }}>UnFollow</button>
                                    : <button onClick={() => {
                                        this.props.follow(user.id)
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
    }
}


export default Users