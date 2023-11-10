import * as types from '../type/authActionTypes'
import fire from '../../config/firebase'
import { toast } from 'react-toastify'

const signInUser = (payload)=>{
    return {
        type:types.SIGN_IN,
        payload
    }
}

const signUpUser = (payload)=>{
    return {
        type:types.SIGN_UP,
        payload
    }
}

export const signoutUser= ()=>{
    return {
        type:types.SIGN_OUT,
    }
}

export const loginUser = (payload,setSuccess)=>(dispatch)=>{
    fire
    .auth()
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then((user)=>{
        console.log(user);
        dispatch(signInUser({
            uid:user.user.uid,
            email:user.user.email,
            displayName:user.user.displayName,
        }))
        setSuccess(true)
    })
    .catch(error=>toast.error("Invalid email or password"));
}

export const registerUser = (payload, setSuccess)=>(dispatch)=>{
    console.log("AuthActionCreator signUpdata == ", payload);
    fire.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then((user)=>{
        fire.auth().currentUser.updateProfile({
            displayName:payload.name,
        }).then(()=>{
            const currentUser = fire.auth().currentUser;
            setSuccess(true);
            console.log(currentUser);
            dispatch(signUpUser({
                uid:currentUser.uid,
                email:currentUser.email,
                displayName:currentUser.displayName,
            }))
        }).catch(error=>console.log(error))
    }).catch((error)=>{
        if(error.code === "auth/email-already-in-use"){
            toast.warning("Email already in use!");
        }
        if(error.code === "auth/invalid-email"){
            toast.error("Invalid Email");
        }
        if(error.code === "auth/weak-password"){
            toast.warning("weak password");
        }
    });
}

export const checkLoggedIn = ()=>(dispatch)=>{
    fire.auth().onAuthStateChanged((user)=>{
        if(user){
            dispatch(
                signInUser({
                    uid:user.uid,
                    email:user.email,
                    displayName:user.displayName,
                })
            )
        }
    })
}

export const logoutUser = ()=>(dispatch)=>{
    fire.auth().signOut().then(()=>{
        dispatch(signoutUser());
    })
}