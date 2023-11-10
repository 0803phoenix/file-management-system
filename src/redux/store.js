import {configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {authReducer} from "./reducer/authReducer";
import fileFolderReducer from "./reducer/fileFolderReducer";

const rootReducer = combineReducers({
    auth:authReducer,
    fileFolders : fileFolderReducer,
})

export const store = configureStore({
    reducer : rootReducer,
})