import React from 'react';
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";


type DataType = {
    id: number | null
    email: string | null
    login: string | null


}

type HeaderPropsType = {
    data: DataType,
   isAuth: boolean | null

}


const  Header = (props: HeaderPropsType) => {
    return (
        <header className={classes.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/512px-Twitter-logo.svg.png"
                alt=""/>
            <div className={classes.loginBlock}>
                {props.isAuth ? props.data.login : <NavLink to={'/login'}>
                    Login
                </NavLink>}
            </div>
        </header>
    );
};

export default Header;