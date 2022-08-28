import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authTC} from "../../redux/auth-reducers";

type mapStateToPropsForRedirectType = {
    isAuth: boolean | null
}

let mapStateToPropsForRedirect = (state: AppStateType): mapStateToPropsForRedirectType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    function RedirectComponent(props: mapStateToPropsForRedirectType & {authTC: () => void}) {
        let {isAuth, authTC, ...restProps} = props
        if (isAuth === null) {
            authTC()
        }else if (!isAuth) return <Redirect to={'/login'}/>

        return <Component {...restProps as T} />
    }


    // @ts-ignore
    return connect(mapStateToPropsForRedirect, {authTC})(RedirectComponent)
}