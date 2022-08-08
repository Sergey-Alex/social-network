import React, {ChangeEvent, ReactElement} from 'react';
import classes from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DiaologItem";
import {Message} from "./Message/Message";
import {Redirect} from "react-router-dom";


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
    onSendMessageClick: () => void
    updateNewMessageBody: (text: string) => void
    isAuth: boolean
}


const Dialogs = (props: DialogsTypeProps): ReactElement => {

    let dialogs = props.dialogsData.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messages = props.message.map(m => <Message key={m.id} textMessage={m.textMessage} id={m.id}/>)

    const addMessage = () => {
        props.onSendMessageClick()
    }

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody(event.currentTarget.value)

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
                <div>
                    <textarea onChange={onChangeHandler} value={props.dialogMessage}></textarea>
                    <button onClick={addMessage}>add</button>
                </div>
            </div>


        </div>
    );
};



export default Dialogs;