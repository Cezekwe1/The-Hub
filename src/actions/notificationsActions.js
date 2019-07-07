import {
  GET_NOTIFICATIONS_SUCCESS,
  RESPOND_ORG_INVITE_SUCCESS,
  RESPOND_FRIEND_REQUEST_SUCCESS,
  REMOVE_FRIEND_NOTIFICATIONS_SUCCESS,
  REMOVE_ORG_NOTIFICATIONS_SUCCESS,
  ADD_ORG_SUCCESS,
  UPDATE_CURRENT_ORG_SUCCESS,
  ADD_FRIEND_SUCCESS
} from "./types";
import * as Notifications_Util from "../utilities/notifications_util";
const getNotificationsSuccess = data => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: data
});

const respondOrgInviteSuccess = data => ({
  type: RESPOND_ORG_INVITE_SUCCESS,
  payload: data
});

const respondFriendRequestSuccess = data => ({
  type: RESPOND_FRIEND_REQUEST_SUCCESS,
  payload: data
});

const removeOrgNotificationsSuccess = data => ({
  type: REMOVE_ORG_NOTIFICATIONS_SUCCESS,
  payload: data
});

const removeFriendNotificationsSuccess = data => ({
  type: REMOVE_FRIEND_NOTIFICATIONS_SUCCESS,
  payload: data
});
const updateCurrentOrgSuccess = data =>({
    type: UPDATE_CURRENT_ORG_SUCCESS,
    payload: data
  })
  
const addOrgSuccess = data => ({
  type: ADD_ORG_SUCCESS,
  payload: data
});

const addFriendSuccess = data =>({
    type: ADD_FRIEND_SUCCESS,
    payload: data
})

export const getNotifications = data => dispatch => {
  return Notifications_Util.getNotifications().then(res => {
    dispatch(getNotificationsSuccess(res.data));
  });
};

export const respondFriendRequest = data => dispatch => {
  return Notifications_Util.respondFriendRequest(data).then(res => {
    if(data["accepted"]){
      dispatch(addFriendSuccess(res.data["new_friend"]))
      let friends = JSON.parse(localStorage.getItem("friends"))
      friends.push(res.data["new_friend"])
      localStorage.setItem("friends",JSON.stringify(friends))
    }
    dispatch(respondFriendRequestSuccess(res.data['meta_data']));
  });
};

export const respondOrgInvite = data => dispatch => {
  return Notifications_Util.respondOrgInvite(data).then(res => {
    if(data["accepted"]){
      dispatch(updateCurrentOrgSuccess(res.data))
      dispatch(addOrgSuccess(res.data["new_org"]))
      localStorage.setItem("current_organization", JSON.stringify(res.data["current_organization"]))
      localStorage.setItem("organization_members", JSON.stringify(res.data["organization_members"]))
    }
    dispatch(respondOrgInviteSuccess(res.data['meta_data']));
  });
};

export const removeOrgNotifications = data => dispatch => {
  return Notifications_Util.removeOrgNotifications(data).then(res => {
    dispatch(removeOrgNotificationsSuccess(data));
  });
};

export const removeFriendNotifications = data => dispatch => {
  return Notifications_Util.removeFriendNotifications(data).then(res => {
    dispatch(removeOrgNotificationsSuccess(data));
  });
};
