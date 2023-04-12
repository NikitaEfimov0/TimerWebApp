
import './FormComponentStyle.css'
import TimerComponent from '../TimerComponent/TimerComponent'
import ToolsComponent from '../Tools/ToolsComponent'
import React, { Component }  from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
export default function FormComponent () {
  return <div className={'form-container'}>
        <ToolsComponent/>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimerComponent/>
    </MuiPickersUtilsProvider>
    </div>
}
