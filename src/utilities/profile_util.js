import axios from "axios"
import {API_URL} from '../config'
export const sendOrgInvite = (id) =>{
    return axios.post(`${API_URL}/users/invite/org`,{target_id: id}, {headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}

export const sendFriendInvite = (id) =>{
    return axios.post(`${API_URL}/users/invite/friend`,{target_id: id}, {headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}

export const getPerson = (id) =>{
    return axios.get(`${API_URL}/users/${id}`, {headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}

export const makeAdmin = (data) =>{
    return axios.post(`${API_URL}/users/upgrade`,data, {headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}

export const removeFriend = (id) =>{
    return axios.post(`${API_URL}/users/remove/friend`,{target_id: id}, {headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}

export const removeMember = (data) =>{
    return axios.post(`${API_URL}/users/remove/org`,data, {headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}

export const removeInvites = (data) => {
    return axios.post(`${API_URL}/users/notifications/remove`,data, {headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}



