import {LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS} from './types'
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


export const logoutSuccess = (data) =>({
    type: LOGOUT_SUCCESS
})

export const logoutFailure = (data) =>({
    type: LOGOUT_FAILURE,
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
    return AuthUtil.login(username,password).then(res => {
        const token = res.data.token
        localStorage.setItem('token', token)
        dispatch(loginSuccess(token))}).catch(err => dispatch(loginFailure(err)))
}

export const logout = () => (dispatch) =>(
    AuthUtil.logout().then(() => {
        localStorage.removeItem("token")
        dispatch(logoutSuccess())}).catch(err => {dispatch(logoutFailure(err))})
)


export const checkAuthState = () => (dispatch) =>{
    const token = localStorage.getItem('token')
    if (token === undefined){
        dispatch(logout())
    }else{
        dispatch(loginSuccess(token))
    }
}

export const signup = ({username, password, email}) => (dispatch) =>{
    return AuthUtil.signup(username,password,email).then(
        res =>{
            const token = res.data.token
            console.log(res)
            localStorage.setItem("token", token)
            dispatch(signupSuccess(token))
        }
        ).catch(err => {
            console.log("this is being called")
            dispatch(signupFailure(err))})
}