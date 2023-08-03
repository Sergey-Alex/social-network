import React from 'react';
import {addMessageDialogAC, DialogPropsType} from "../../redux/dialogs-reducer";
import {AppStateType} from "../../redux/redux-store";
import Dialogs, {MessageTypeText} from "./Diaologs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

type MapStatePropsType = {
        message: Array<MessageTypeText>,
        dialogsData:Array<DialogPropsType>

      //  isAuth: boolean
    }

    let mapStateToProps = (state: AppStateType): MapStatePropsType => {
        return {
            message: state.messagePage.message,
            dialogsData: state.messagePage.dialogsData,
        //    isAuth: state.auth.isAuth
        }
    }

    type MapDispatchPropsType ={
        onSendMessageClick: (values: string) => void
    //    updateNewMessageBody: (text: string) =>void
    }

    let mapDispatchToProps = (dispatch: Dispatch) : MapDispatchPropsType  => {
        return {
            onSendMessageClick: (values) => {
                dispatch(addMessageDialogAC(values))
            },
            // updateNewMessageBody: (text: string) => {
            //     dispatch(ChangeMessageDialogsAC(text))
            // }
        }
    }



export default  compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

