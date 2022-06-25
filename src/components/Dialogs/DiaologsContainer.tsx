import React from 'react';
import {addMessageDialogAC, ChangeMessageDialogsAC, DialogPropsType} from "../../redux/dialogs-reducer";
import {AppStateType} from "../../redux/redux-store";
import Dialogs, {MessageTypeText} from "./Diaologs";
import {connect} from "react-redux";
import {Dispatch} from "redux";



// type DiaologsTypeProps = {
//     dialogMessage: string,
//     message: Array<MessageTypeText>
//     dialogsData: Array<DiaologPropsType>
//     dispatch: (action: ActionsType) => void
//     store: StoreType
// }


// const DialogsContainer = () => {

//     return <StoreContext.Consumer>
//         {
//             (store) => {
//
//                 const onSendMessageClick = () => {
//                     store.dispatch(addMessageDialogAC(store.getState().messagePage.newDialogMessage))
//                 }
//
//                 const updateNewMessageBody = (text: string) => {
//                     store.dispatch(ChangeMessageDialogsAC(text))
//                 }
//
//                 return (<Dialogs dialogsData={store.getState().profilePage.dialogsData}
//                                  message={store.getState().messagePage.message}
//                                  onSendMessageClick={onSendMessageClick}
//                                  dialogMessage={store.getState().messagePage.newDialogMessage}
//                                  updateNewMessageBody={updateNewMessageBody}/>
//
//                 )
//             }}
//
//     </StoreContext.Consumer>
// };

    type MapStatePropsType = {
        message: Array<MessageTypeText>,
        dialogsData:Array<DialogPropsType>
        dialogMessage: string,
    }

    let mapStateToProps = (state: AppStateType): MapStatePropsType => {
        return {
            message: state.messagePage.message,
            dialogsData: state.messagePage.dialogsData,
            dialogMessage: state.messagePage.newDialogMessage,
        }
    }

    type MapDispatchPropsType ={
        onSendMessageClick: () => void
        updateNewMessageBody: (text: string) =>void
    }

    let mapDispatchToProps = (dispatch: Dispatch) : MapDispatchPropsType  => {
        return {
            onSendMessageClick: () => {
                dispatch(addMessageDialogAC())
            },
            updateNewMessageBody: (text: string) => {
                dispatch(ChangeMessageDialogsAC(text))
            }
        }
    }


export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

