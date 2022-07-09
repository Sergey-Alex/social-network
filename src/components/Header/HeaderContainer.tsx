import {Component} from "react";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/auth-reducers";



class HeaderContainer extends Component<HeaderContainerPropsType>{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0//auth/me`, {
            withCredentials: true
        })
            .then(res => {
               if (res.data.resultCode === 0) {
                   let {id, email, login} = res.data.data
                   this.props.setAuthUserData(id, email, login)
               }

            })
    }

    render() {
        return <Header data = {this.props.data} isAuth = {this.props.isAuth}/>
    }
}
type DataType = {
    id: number | null
    email: string | null
    login: string | null
}

type MapDispatchPropsType = {
    setAuthUserData: (id: number, email: string, login: string)=> void
}

type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    isAuth: boolean
    data: DataType
}

const mapStateToProps = (state:AppStateType): MapStatePropsType => ({
    data: state.auth.data,
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps,{setAuthUserData})(HeaderContainer);