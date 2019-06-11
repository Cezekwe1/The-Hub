import axios from 'axios'


export const login = (username, password) => {
    let h = new Headers();
    return axios.post( "http://127.0.0.1:8000/users/auth/login/", {username,password})
}

export const signup = (username, password, email) => {
    return axios.post( "http://127.0.0.1:8000/users/auth/signup/", {username,password,email})
}

export const logout = () =>{
    return fetch( "http://127.0.0.1:8000/users/auth/logout/", {
        method: 'POST'
    })
}