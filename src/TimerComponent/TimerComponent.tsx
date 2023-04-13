import "./TimerComponentStyle.css"

import {useEffect, useRef, useState} from "react";

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Fab, Snackbar, TextField, ThemeProvider } from '@material-ui/core'
import {KeyboardTimePicker } from '@material-ui/pickers'
import StopIcon from '@material-ui/icons/Stop';
import {myTheme} from "../Theme/AppTheme";
import PeriodComponent from "./PeriodComponent/PeriodComponent";
import PauseIcon from '@material-ui/icons/Pause';
import { useDispatch, useSelector } from 'react-redux'
import { statSync } from 'fs'
import { STATE } from '../store/forms/formsReducer'
import { type } from 'os'
import { Component } from 'react'
import React from 'react'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

export default function TimerComponent(){

    const typeOfTimer = useSelector((state:any) => state.timer.state)
    const intervalID = useRef<any>(null);
    const [time, setTime] = useState(0);
    const [start, setStart] = useState(false);
    const [pause, setPause] = useState(false);
    const [stop, setStop] = useState(false);

    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");

    const [isEndOfTime, setIsEndOfTime] = useState(false)

    const [isInvalid, setIsInvalid] = useState(false)


    const [triesToRunWhenInvalid, setTriesToRunWhenInvalid] = useState(false);



    useEffect(()=>{
      setTime(0)
      setStart(false)
      setPause(false)
      setIsInvalid(false)
    }, [typeOfTimer])

    useEffect(()=>{
        if(start && !pause && intervalID.current === null) {
            intervalID.current = setInterval(() => {
              typeOfTimer===0?
                    setTime(time=>time + 1):setTime(time=>time-1);
                }, 1000);
        }
        if(pause){
            return () => {clearInterval(intervalID.current)
               intervalID.current = null
            };
        }

        if(typeOfTimer === 1){
          if(time<=0 && intervalID.current!==null){
            setStart(false);
            setPause(false);

            setTime(0);
            clearInterval(intervalID.current);
            intervalID.current = null;
            setIsEndOfTime(true)
          }
        }

    }, [start, pause, time])


  useEffect(()=>{

        let m = Math.floor(time / 60);
        const h = Math.floor(m / 60);

        m = Math.abs(h * 60 - m);

        const s = Math.abs(h * 60 * 60 + m * 60 - time);


        setHours(h >= 10 ? h.toString() : `0${h}`);
        setMinutes(m >= 10 ? m.toString() : `0${m}`);
        setSeconds(s >= 10 ? s.toString() : `0${s}`);


    }, [time]);





    const onTimerValueChanged = (event: any) =>{

        const reg = new RegExp("^([01]\\d|2[0-3]):([0-5]\\d)");
        setIsInvalid(!reg.test(event.target.value));
        if(!isInvalid) {
          const timeArray = event.target.value.split(":");
          const hours = parseInt(timeArray[0]);
          const minutes = parseInt(timeArray[1]);
          const seconds = (hours * 60 + minutes) * 60;
          setTime(seconds ? seconds : 0)
        }

    }



    const playButtonHandler = () =>{

      if(!isInvalid) {

        setStart(true);
        setPause(false);
      }

      else{
        setTriesToRunWhenInvalid(true);
      }


        // initTimer()

    }

    const pauseButtonHandler = () =>{
        setPause(true)

    }

    const stopButtonHandler = () =>{
        setStart(false);
        setPause(false);

        setTime(0);
        clearInterval(intervalID.current);
        intervalID.current = null;


    }

  function handleCloseError (){
      setTriesToRunWhenInvalid(false);
  }

  function handleClose () {
    setIsEndOfTime(false)
    setStart(false);
    setPause(false);

    setTime(0);
    clearInterval(intervalID.current);
    intervalID.current = null;
  }

  return <div className={"timer-container"}>


        <div className={"period-box"}>

            <PeriodComponent>{{value: hours, text: "HOURS"}}</PeriodComponent>
            <PeriodComponent>{{value: minutes, text: "MINUTES"}}</PeriodComponent>
            <PeriodComponent>{{value: seconds, text: "SECONDS"}}</PeriodComponent>

        </div>
        <ThemeProvider theme={myTheme}>

            {!start?(typeOfTimer === 1?
              <div className={"buttonList"}>
              <TextField
                type={"text"}
                label={"hh:mm"}
                variant={"outlined"}
                defaultValue={"00:00"}
                error={isInvalid}
                onChange={(event)=>onTimerValueChanged(event)}
                style = {{width: 100}}
              />
                <Fab color="secondary" aria-label="add" size={"large"} className={"button"} onClick={playButtonHandler}>
                  <PlayArrowIcon/>
                </Fab>
              </div>:
            <Fab color="secondary" aria-label="add" size={"large"} className={"button"} onClick={playButtonHandler}>
                <PlayArrowIcon/>
            </Fab>):<div className={"buttonList"}>
                    {!pause?
                        <Fab aria-label="stop" size={"large"} className={"button"} onClick={pauseButtonHandler}>
                            <PauseIcon />
                        </Fab>
                        :
                        <Fab aria-label="stop" size={"large"} className={"button"} onClick={playButtonHandler}>
                            <PlayArrowIcon />
                        </Fab>}
                    <Fab aria-label="stop" size={"large"} className={"button"} onClick={stopButtonHandler}>
                        <StopIcon />
                    </Fab>
                </div>}

          <Snackbar open={isEndOfTime} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity="error" elevation={6} variant="outlined">
              Time is over!
            </MuiAlert>
          </Snackbar>

          <Snackbar open={triesToRunWhenInvalid} autoHideDuration={6000} onClose={handleCloseError}>
            <MuiAlert onClose={handleCloseError} severity="error" elevation={6} variant="filled">
              Your input time must be like hh:mm!
            </MuiAlert>
          </Snackbar>

        </ThemeProvider>


    </div>
}
