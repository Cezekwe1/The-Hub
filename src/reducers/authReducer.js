import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actions/types";

const instialState = {
  username: null,
  token: null,
  organizations: [],
  current_organization: null,
  friends: [],
  organization_members: [],
  errors: null,
};

export default function(state = instialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        token: null,
        username: null,
        current_organization: null,
        organizations: null,
        friends: null,
        organization_members: null,
        errors: "invalid"
      };
      break;
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      console.log("your in signup success");
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
        current_organization: action.payload.current_organization,
        friends: action.payload.friends,
        organization_members: action.payload.organization_members,
        organizations: action.payload.organizations,
        errors: null
      };
      break;
    case LOGOUT_SUCCESS:
      return instialState
      break;
    default:
      return state;
  }
}
