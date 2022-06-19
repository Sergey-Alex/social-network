import React from 'react';
import {ActionsType, DiaologPropsType, MessageTypeText, StatePropsType} from "../../redux/store";
import {addMessageDialogAC, ChangeMessageDialogsAC} from "../../redux/dialogs-reducer";
import {StoreType} from "../../redux/redux-store";
import Dialogs from "./Diaologs";


type DiaologsTypeProps = {
    dialogMessage: string,
    message: Array<MessageTypeText>
    dialogsData: Array<DiaologPropsType>
    dispatch: (action: ActionsType) => void
    store: StoreType
}


const DialogsContainer = ({message, dialogsData, dialogMessage, store}: DiaologsTypeProps) => {


    const onSendMessageClick = () => {
        store.dispatch(addMessageDialogAC(dialogMessage))
    }

    const updateNewMessageBody = (text: string) => {
        store.dispatch(ChangeMessageDialogsAC(text))
    }

    return (
        <Dialogs dialogsData={dialogsData}
                 message={message}
                 onSendMessageClick={onSendMessageClick}
                 dialogMessage={dialogMessage}
                updateNewMessageBody={updateNewMessageBody}

        />
    )

};

export default DialogsContainer;