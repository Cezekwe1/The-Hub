import {LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_SUCCESS, SIGNUP_FAILURE} from '../actions/types'


const instialState = {
    worked: null, 
    errors: null
}


export default function(state = instialState, action){
    Object.freeze(state)
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                worked : "it worked",
                errors : null
            }
        case SIGNUP_FAILURE:
        case LOGIN_FAILURE:
            return {
                ...state,
                worked: null,
                errors: "Invalid Credentials"
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                worked: "it worked to signup",
                errors: null
            }

        default: 
            return state;
    }
}