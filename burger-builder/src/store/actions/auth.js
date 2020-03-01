import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId:userId
    }
}
export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const logOut = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout =(expirationTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logOut())
        },expirationTime * 1000);
    }
}

export const auth =(email,password,isSignup)=>{
    return(dispatch=>{
        dispatch(authStart());
        const authData ={
            email: email,
            password:password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBu6kMSyPgJe8MGtjylhC5o0xndC0bKSIU';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBu6kMSyPgJe8MGtjylhC5o0xndC0bKSIU';
        }
        axios.post(url,authData)
            .then(resp=>{
                const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn*1000) 
                localStorage.setItem('token', resp.data.idToken);
                localStorage.setItem('expirationTime',expirationDate)
                localStorage.setItem('userId',resp.data.localId)
                dispatch(authSuccess(resp.data.idToken,resp.data.localId))
                dispatch(checkAuthTimeout(resp.data.expiresIn))
            })
            .catch(err=>{
                console.log(err)
                dispatch(authFailed(err.response.data.error));
            })
    })
}

export const setAuthRedirectPatch = (path)=>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState =()=>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logOut())
        }else{
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            const userId = localStorage.getItem('userId')
            if(expirationTime > new Date()){
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime())/ 1000 ))
            }else{
                dispatch(logOut())
            }
            
        }
    }
}