import {Component} from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/auth-reducers";
import {AuthApi} from "../../api/api";



class HeaderContainer extends Component<HeaderContainerPropsType>{

    componentDidMount() {
        AuthApi.authMe().then((res) => {
                   let {id, email, login} = res.data
                   this.props.setAuthUserData(id, email, login)
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