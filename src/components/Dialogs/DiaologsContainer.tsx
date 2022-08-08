import React, {ReactElement} from 'react';
import {addMessageDialogAC, ChangeMessageDialogsAC, DialogPropsType} from "../../redux/dialogs-reducer";
import {AppStateType} from "../../redux/redux-store";
import Dialogs, {MessageTypeText} from "./Diaologs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

    type MapStatePropsType = {
        message: Array<MessageTypeText>,
        dialogsData:Array<DialogPropsType>
        dialogMessage: string,
      //  isAuth: boolean
    }

    let mapStateToProps = (state: AppStateType): MapStatePropsType => {
        return {
            message: state.messagePage.message,
            dialogsData: state.messagePage.dialogsData,
            dialogMessage: state.messagePage.newDialogMessage,
        //    isAuth: state.auth.isAuth
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



export default  compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

