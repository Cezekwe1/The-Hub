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





// export const login = ({username, password}) => (dispatch) =>{
//     return AuthUtil.login(username,password).then(data=> {
//         if (!data.ok){
//             throw Error("incorrect")
//         }else{
//             return data.json()
//         }
//     }).then(data => {
//         console.log(data)
//         dispatch(loginSuccess(data))}).catch(err => dispatch(loginFailure(err)))
// }

export const login = ({username, password}) => (dispatch) =>{
    return AuthUtil.login(username,password).then(data => {
        const token = data.data.token
        localStorage.setItem('token', token)
        dispatch(loginSuccess(data))}).catch(err => dispatch(loginFailure(err)))
}

export const signup = ({username, password, email}) => (dispatch) =>{
    return AuthUtil.signup(username,password,email).then(data=>{
        if(!data.ok){
            throw Error("wrong")
        }else{
            return data.json()
        }
    }).then(data =>{dispatch(signupSuccess(data))}).catch(err => dispatch(signupFailure(err)))
}