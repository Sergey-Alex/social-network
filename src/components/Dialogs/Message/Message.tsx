import React from 'react';
import classes from '../Dialogs.module.css'


type MessageTextType = {
 textMessage: string
 id: number
}


export const Message = ({textMessage}: MessageTextType)  => {
 return (
 <div className={classes.message}>
  <div className={classes.position}><div className={classes.circle}></div>{textMessage}</div>

 </div>)
}
