import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
const authSuccess = (authData, email) => {

   
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userID: authData.localId,
        email: email
    }
}
const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email')
    localStorage.removeItem('expiryTime')
    return {
        type: actionTypes.LOG_OUT
    }
}

const checkTimeout = (expirationTime) => {
    return dispatch => {
        setInterval(() => {
         //   console.log(expirationTime)
           // dispatch(logOut())
        }, expirationTime * 1000);
    }

}

export const authInit = (email, password, isSignup) => {
    return dispatch => {
        //console.log("actions: ",email,password)
        dispatch(authStart())
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBeNNEfi6Wqci0sjvsd8reJBu1KgGjSkxU';
        if (!isSignup)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeNNEfi6Wqci0sjvsd8reJBu1KgGjSkxU'

        let authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        axios.post(url, authData)
            .then(response => {
             //   console.log("Auth success", response.data);
            //stored locally for auto login
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('email', email);
                let expiryTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expiryTime', expiryTime);
                dispatch(authSuccess(response.data, email));
                dispatch(checkTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log("Auth Error", err.response);
                dispatch(authFail(err.response.data.error.message))
            })

    }
}


export const autoSignin = () => {
    return dispatch => {

        if(!localStorage.getItem('token')){
            
            dispatch(logOut())
        }else if(new Date(localStorage.getItem('expiryTime'))<new Date()){
            
            dispatch(logOut())
        }else{
            const authData = {
                idToken: localStorage.getItem('token'),
                localId:localStorage.getItem('userId'),            
            }
            let expiresIn=new Date(localStorage.getItem('expiryTime'));
            let email=localStorage.getItem('email');
            dispatch(authSuccess(authData, email));
           // console.log((expiresIn.getTime()-(new Date().getTime()))/1000)
            dispatch(checkTimeout((expiresIn.getTime()-(new Date().getTime()))/1000))
        }


        
    }
}