export const login = (username, password) => {
    return fetch( "http://127.0.0.1:8000/users/auth/login/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    })
}

export const signup = (username, password, email) => {
    return fetch( "http://127.0.0.1:8000/users/auth/signup/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
            email
        })
    })
}