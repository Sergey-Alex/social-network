import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DiaologItem";
import {Message} from "./Message/Message";
import {ActionsType, DiaologPropsType, MessageTypeText} from "../../redux/store";
import {addMessageDialogAC, ChangeMessageDialogsAC} from "../../redux/dialogs-reducer";


type DialogsTypeProps = {
    dialogMessage: string,
    message: Array<MessageTypeText>
    dialogsData: Array<DiaologPropsType>
    updateNewMessageBody: (text:string)=> void
    onSendMessageClick: () => void
}


const Dialogs = ({
                     message,
                     dialogsData,
                     onSendMessageClick,
                     dialogMessage,
                     updateNewMessageBody}: DialogsTypeProps) => {


    let dialogs = dialogsData.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messages = message.map(m => <Message key={m.id} textMessage={m.textMessage} id={m.id}/>)

    const addMessage = () => {
        onSendMessageClick()
    }

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        updateNewMessageBody(event.currentTarget.value)

    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogs}
            </div>
            <div className={classes.messages}>
                {messages}
                <div>
                    <textarea onChange={onChangeHandler} value={dialogMessage}></textarea>
                    <button onClick={addMessage}>add</button>
                </div>
            </div>


        </div>
    );
};

export default Dialogs;