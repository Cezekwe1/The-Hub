import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actions/types";

const instialState = {
  token: null,
  errors: null
};

export default function(state = instialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        errors: null
      };
      break;
    case SIGNUP_FAILURE:
        console.log("your in signup failure");
      return {
        ...state,
        token: null,
        errors: "Invalid Credentials"
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        errors: "Invalid Credentials"
      };
      break;
    case LOGOUT_FAILURE:
      return {
        ...state,
        errors: action.payload
      };
      break;
    case SIGNUP_SUCCESS:
      console.log("your in signup success");
      return {
        ...state,
        token: action.payload,
        errors: null
      };
      break;
    case LOGOUT_SUCCESS:
      return {
        token: null,
        errors: null
      };
      break;
    default:
      return state;
  }
}
