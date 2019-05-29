import {LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_SUCCESS} from './types'
import * as AuthUtil from "../utilities/auth_util.js"

export const loginSuccess = (data) =>({
    type: LOGIN_SUCCESS,
    payload: data
})

export const loginFailure = (data) =>({
    type: LOGIN_FAILURE,
    payload: data
})

export const signupSuccess = (data) =>({
    type: SIGNUP_SUCCESS,
    payload: data
})

export const signupFailure = (data) =>({
    type: SIGNUP_FAILURE,
    payload: data
})





export const login = ({username, password}) => (dispatch) =>{
    AuthUtil.login(username,password).then(data=> {
        if (!data.ok){
            throw Error("incorrect")
        }else{
            data.json()
        }
    }).then(data => {dispatch(loginSuccess(data))}).catch(err => console.log(err))
}

export const signup = ({username, password, email}) => (dispatch) =>{
    AuthUtil.signup(username,password,email).then(data=>{
        if(!data.ok){
            throw Error("wrong")
        }else{
            data.json()
        }
    }).then(data =>{dispatch(signupSuccess(data))}).catch(err => console.log(err))
}