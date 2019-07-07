import axios from 'axios'
import {API_URL} from "../config"
export const getNotifications = () =>{
    return axios.get(`${API_URL}/users/notifications`,{headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}

export const respondOrgInvite = (data) =>{
    return axios.post(`${API_URL}/users/invite/accept/org`,data,{headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}

export const respondFriendRequest = (data) =>{
    return axios.post(`${API_URL}/users/invite/accept/friend`,data,{headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}

export const removeFriendNotifications = (data) =>{
    return axios.post(`${API_URL}/users/invite/remove/friend`,data,{headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}

export const removeOrgNotifications = (data) =>{
    return axios.post(`${API_URL}/users/invite/remove/org`,data,{headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}