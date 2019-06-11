import axios from 'axios'
// export const login = (username, password) => {
//     let h = new Headers();
//     return fetch( "http://127.0.0.1:8000/users/auth/login/", {
//         method: 'POST',
//         credentials: 'include',
//         headers: h,
//         body: JSON.stringify({
//             username,
//             password
//         })
//     })
// }

export const login = (username, password) => {
    let h = new Headers();
    return axios.post( "http://127.0.0.1:8000/users/auth/login/", {username,password})
}

export const signup = (username, password, email) => {
    let h = new Headers();
    h.append('Access-Control-Allow-Credentials', 'true')
    return fetch( "http://127.0.0.1:8000/users/auth/signup/", {
        method: 'POST',
        credentials: 'include',
        cache: 'no-cache',
        headers: h,
        body: JSON.stringify({
            username,
            password,
            email
        })
    })
}

export const logout = () =>{
    return fetch( "http://127.0.0.1:8000/users/auth/logout/", {
        method: 'POST'
    })
}