import { SIGN_IN, SIGN_OUT, SIGN_UP } from "../type/authActionTypes";

const initialState = {
    isAuthenticated:false,
    user:{}
}

export const authReducer = (state= initialState, action)=>{
    switch(action.type){
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated:true,
                user:action.payload
            }
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated:false,
                user:{}
            }
        case SIGN_UP:
            return {
                ...state,
                isAuthenticated:true,
                user:action.payload
            }
        default: return state;
    }
}