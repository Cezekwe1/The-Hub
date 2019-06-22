import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS
} from "./types";
import * as AuthUtil from "../utilities/auth_util.js";

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export const loginFailure = data => ({
  type: LOGIN_FAILURE,
  payload: data
});

export const signupSuccess = data => ({
  type: SIGNUP_SUCCESS,
  payload: data
});

export const signupFailure = data => ({
  type: SIGNUP_FAILURE,
  payload: data
});

export const logoutSuccess = data => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailure = data => ({
  type: LOGOUT_FAILURE,
  payload: data
});

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

export const login = ({ username, password }) => dispatch => {
  return AuthUtil.login(username, password)
    .then(res => {
      const token = res.data.token;
      const current_organization = JSON.stringify(res.data.current_organization)
      const organizations =  JSON.stringify(res.data.organizations)
      const organization_members = res.data.organization_members 
      const friends = res.data.friends 
      const username = res.data.user.username
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("current_organization", JSON.stringify(current_organization));
      localStorage.setItem("organizations", JSON.stringify(organizations))
      localStorage.setItem("organization_members", JSON.stringify(organization_members))
      localStorage.setItem("friends", JSON.stringify(friends))

      dispatch(loginSuccess({token, current_organization, organizations, organization_members, friends, username}));
    })
    .catch(err => dispatch(loginFailure(err)));
};

export const logout = () => dispatch =>
  AuthUtil.logout()
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("organizations");
      localStorage.removeItem("current_organization");
      
      dispatch(logoutSuccess());
    })
    .catch(err => {
      dispatch(logoutFailure(err));
    });

export const checkAuthState = () => dispatch => {
  const token = localStorage.getItem("token");
  const organizations = JSON.parse(localStorage.getItem("organizations"));
  const current_organization = JSON.parse(localStorage.getItem("current_organization"));
  const friends = JSON.parse(localStorage.getItem("friends"))
  const organization_members = JSON.parse(localStorage.getItem("organization_members"))
  const username = localStorage.getItem("username")
  console.log(token);
  if (token === undefined) {
    console.log("im in here for some reason")
    dispatch(logout());
  } else {
    console.log("im here where im suppose to be")
    dispatch(loginSuccess({token, current_organization, organizations, friends, organization_members, username}));
  }
};

export const signup = ({ username, password, email }) => dispatch => {
  return AuthUtil.signup(username, password, email)
    .then(res => {
      const token = res.data.token;
      const current_organization = res.data.current_organization 
      const organizations = res.data.organizations 
      const organization_members = res.data.organization_members 
      const friends = res.data.friends 
      const username = res.data.user.username
      console.log("this is how it comes in on signuppppppppp", current_organization)
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("current_organization", JSON.stringify(current_organization));
      localStorage.setItem("organizations", JSON.stringify(organizations))
      localStorage.setItem("organization_members", JSON.stringify(organization_members))
      localStorage.setItem("friends", JSON.stringify(friends))
      dispatch(signupSuccess({token, current_organization, organizations, organization_members, friends, username}));
    })
    .catch(err => {
      console.log("this is being called");
      dispatch(signupFailure(err));
    });
};
