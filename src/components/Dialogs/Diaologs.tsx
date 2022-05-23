import React from 'react';
import classes from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DiaologItem";
import {Message} from "./Message/Message";
import {DiaologPropsType, MessageTypeText} from "../../redux/state";

type DiaologsTypeProps = {
    message: Array<MessageTypeText>
    dialogsData: Array<DiaologPropsType>
}


const Dialogs = ({message, dialogsData}:DiaologsTypeProps) => {


    let dialogs = dialogsData.map(d => <DialogItem name = {d.name} id = {d.id}/>)
    let messages = message.map(m =>  <Message textMessage={m.textMessage} id={m.id}/>)

    const newMessageElement = React.createRef<HTMLTextAreaElement>()

    const addMessage = () => {
        console.log(newMessageElement.current?.value)
    }


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogs}
            </div>
            <div className={classes.messages}>
                {messages}
                <div>
                    <textarea ref={newMessageElement}></textarea>
                    <button onClick={addMessage} >add</button>
                </div>
            </div>


        </div>
    );
};

export default Dialogs;