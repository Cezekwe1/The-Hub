import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_CURRENT_ORG_SUCCESS,
  ADD_ORG_SUCCESS,
  ADD_FRIEND_SUCCESS
} from "../actions/types";

const instialState = {
  user: null,
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
    case LOGOUT_FAILURE:
      return {
        ...state,
        errors: "invalid"
      }
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    
      return {
        ...state,
        token: null,
        username: null,
        current_organization: null,
        organizations: [],
        friends: [],
        organization_members: [],
        errors: "invalid"
      };
      break;
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        current_organization: action.payload.current_organization,
        friends: action.payload.friends,
        organization_members: action.payload.organization_members,
        organizations: action.payload.organizations,
        errors: null
      };
      break;
    case UPDATE_CURRENT_ORG_SUCCESS:
      return {
        ...state,
        organization_members: action.payload.organization_members,
        current_organization: action.payload.current_organization
      }
    case ADD_ORG_SUCCESS:
      return {
        ...state,
        organizations: [...state.organizations,action.payload]
      }
    case ADD_FRIEND_SUCCESS:
      return {
        ...state,
        friends: [...state.friends, action.payload]
      }
    case LOGOUT_SUCCESS:
      return instialState
      break;
    default:
      return state;
  }
}
