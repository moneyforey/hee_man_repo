import {combineReducers, legacy_createStore } from "redux";
import reducer from "./reducer";

const rootReducer = combineReducers({
       data:reducer      
});

export const store = legacy_createStore(rootReducer)