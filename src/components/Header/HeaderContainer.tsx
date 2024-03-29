import {Component} from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authTC, loginOutTC} from "../../redux/auth-reducers";



class HeaderContainer extends Component<HeaderContainerPropsType> {


    render() {
        return <Header data={this.props.data} isAuth={this.props.isAuth} loginOutTC = {this.props.loginOutTC}/>
    }
}

export type AuthDataType = {
    id: number | null
    email: string | null
    login: string | null
}

type MapDispatchPropsType = {
 //   setAuthUserData: (id: number, email: string, login: string) => void
   // authTC: () => void
    loginOutTC: () => void
}

type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    isAuth: boolean
    data: AuthDataType
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    data: state.auth.data,
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {loginOutTC})(HeaderContainer);