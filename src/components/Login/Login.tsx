import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {loginMeTc} from "../../redux/auth-reducers";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean >(state => state.auth.isAuth)
    const userId = useSelector<AppStateType, number |null>(state => state.auth.data.id)

    const onSubmit = (formData: FormDataType) => {
        dispatch(loginMeTc({email: formData.login, password: formData.password, rememberMe:formData.rememberMe}))
    }


    if (isAuth){
        return <Redirect to={`/profile/${userId}`}/>
    }
    return <div>
        <h1>
            LOGIN
        </h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>;
};
export default Login


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <Field placeholder={'login'} name={'login'}
                       component={Input}
                       type={'text'}
                       validate = {[required]}
                />
                <Field placeholder={'Password'} type={'password'} name={'password'} component={Input} validate = {[required]}/>
                <Field name={'rememberMe'} component={'input'} type={'Checkbox'}/>
                <div style={{color: 'blueviolet'}}>{props.error}</div>
                <button>Login</button>
            </form>
        </div>

    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)
