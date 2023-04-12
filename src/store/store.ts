import { combineReducers, createStore, } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import  { timerReducer } from './forms/formsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'


const rootReducer = combineReducers({
  timer: timerReducer
});

const store = createStore(rootReducer, composeWithDevTools())

export default store;
