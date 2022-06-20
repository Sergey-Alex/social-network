import React from 'react';
import {ActionsType, DiaologPropsType, MessageTypeText, StatePropsType} from "../../redux/store";
import {addMessageDialogAC, ChangeMessageDialogsAC} from "../../redux/dialogs-reducer";
import {StoreType} from "../../redux/redux-store";
import Dialogs from "./Diaologs";
import StoreContext from '../../StoreContext';


type DiaologsTypeProps = {
    dialogMessage: string,
    message: Array<MessageTypeText>
    dialogsData: Array<DiaologPropsType>
    dispatch: (action: ActionsType) => void
    store: StoreType
}


const DialogsContainer = () => {

    return <StoreContext.Consumer>
        {
            (store) => {

                const onSendMessageClick = () => {
                    store.dispatch(addMessageDialogAC(store.getState().messagePage.newDialogMessage))
                }

                const updateNewMessageBody = (text: string) => {
                    store.dispatch(ChangeMessageDialogsAC(text))
                }

                return (<Dialogs dialogsData={store.getState().profilePage.dialogsData}
                                 message={store.getState().messagePage.message}
                                 onSendMessageClick={onSendMessageClick}
                                 dialogMessage={store.getState().messagePage.newDialogMessage}
                                 updateNewMessageBody={updateNewMessageBody}/>

                )
            }}

    </StoreContext.Consumer>
};

export default DialogsContainer;