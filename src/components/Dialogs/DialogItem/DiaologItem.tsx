import React from 'react';
import classes from '../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogType = {
    name:string
    id: number
}


export const DialogItem = ({name, id}: DialogType)  => {
  return  <div className={classes.dialogs + ' ' + classes.active}>
        <NavLink to={"/dialogs/" + id }>{name}</NavLink>
    </div>
}



