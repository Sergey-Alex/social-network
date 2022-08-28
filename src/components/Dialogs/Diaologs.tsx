import React, {ReactElement} from 'react';
import classes from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DiaologItem";
import {Message} from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


export type MessageTypeText = {
    id: number
    textMessage: string
}
export type DialogPropsType = {
    name: string
    id: number
}

type DialogsTypeProps = {
    dialogMessage: string,
    message: Array<MessageTypeText>
    dialogsData: Array<DialogPropsType>
    onSendMessageClick: (values: string) => void
  //  updateNewMessageBody: (text: string) => void
    isAuth: boolean | null
}


const Dialogs = (props: DialogsTypeProps): ReactElement => {

    let dialogs = props.dialogsData.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messages = props.message.map(m => <Message key={m.id} textMessage={m.textMessage} id={m.id}/>)

    // const addMessage = () => {
    //     props.onSendMessageClick()
    // }

    // const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    //     props.updateNewMessageBody(event.currentTarget.value)
    //
    // }

    let addNeMessage = (values: any ) => {
        props.onSendMessageClick(values.newMessageBody)
    }
    // debugger
    //  if(!props.isAuth) return <Redirect to={'/Login'}/>

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogs}
            </div>
            <div className={classes.messages}>
                {messages}
            </div>
            <AddMessageFormRedux onSubmit={addNeMessage}/>
        </div>
    );
};


export default Dialogs;


const AddMessageForm: React.FC<InjectedFormProps<string>> = (props) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name={'newMessageBody'} placeholder={'enter message'}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    </div>
}

const AddMessageFormRedux = reduxForm<string>({form: 'dialogAddMessageForm'})(AddMessageForm)