import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {useDispatch} from "react-redux";
import {loginMeTc} from "../../redux/auth-reducers";


const Login = () => {
    const dispatch = useDispatch()
    const onSubmit = (formData: FormDataType) => {
        dispatch(loginMeTc(formData.login, formData.password, formData.rememberMe))
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
                <Field placeholder={'login'} name={'login'} component={'input'} type={'text'}/>
                <Field placeholder={'Password'} name={'password'} component={'input'}/>
                <Field name={'rememberMe'} component={'input'} type={'Checkbox'}/>
                <button>Login</button>
            </form>
        </div>

    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)
