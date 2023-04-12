import { TYPES } from './formsTypes'

const TIMER = "TIMER"
const STOPWATCH = "STOPWATCH"



export const setTypeAsTimer = (payload:TYPES) => ({type:TIMER, payload: payload})
export const setTypeAsStopwatch = (payload:TYPES) => ({type:STOPWATCH, payload: payload})
