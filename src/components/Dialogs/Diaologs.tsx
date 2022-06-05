import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DiaologItem";
import {Message} from "./Message/Message";
import {
    ActionsType,
    // addMessageAC,
    addMessageDialogAC,
    ChangeMessageDialogsAC,
    DiaologPropsType,
    MessageTypeText
} from "../../redux/state";

type DiaologsTypeProps = {
    dialogMessage: string,
    message: Array<MessageTypeText>
    dialogsData: Array<DiaologPropsType>
    dispatch: (action: ActionsType) => void
}


const Dialogs = ({message, dialogsData, dispatch, dialogMessage}:DiaologsTypeProps) => {


    let dialogs = dialogsData.map(d => <DialogItem key={d.id} name = {d.name} id = {d.id}/>)
    let messages = message.map(m =>  <Message key={m.id} textMessage={m.textMessage} id={m.id}/>)

    console.log({dialogMessage})

    const addMessage = () => {
        dispatch(addMessageDialogAC(dialogMessage))
    }

    const onChangeHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(ChangeMessageDialogsAC(event.currentTarget.value))
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