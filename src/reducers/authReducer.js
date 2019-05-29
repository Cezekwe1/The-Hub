import {LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_SUCCESS, SIGNUP_FAILURE} from '../actions/types'

const instialState = {
    user:{}
}


export default function(state = instialState, action){
    Object.freeze(state)
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                worked : "it worked"
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                errors: "Invalid Credentials"
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                worked: "it worked to signup"
            }

        default: 
            return state;
    }
}