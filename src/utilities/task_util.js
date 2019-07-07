import axios from 'axios'
import {API_URL} from "../config"
// export const getTasks = () => (
//     fetch("http://127.0.0.1:8000/tasks/",{
//         method: "GET",
//         credentials: "include"
//     })
// )


export const getTasks = () =>(
    
    axios.get(`${API_URL}/tasks/`,{headers: {"Authorization": "Token " + localStorage.getItem("token")}})
)

export const delTask = (id) =>(
    axios.delete(`${API_URL}/tasks/delete/${id}`,{headers: {"Authorization": "Token " + localStorage.getItem("token")}})
)

export const updateTask = (id, info) =>(
    axios.post(`${API_URL}/tasks/update/${id}/`, info, {headers: {"Authorization": "Token " + localStorage.getItem("token")}})
)


export const makeTask = (task) =>(
    axios.post(`${API_URL}/tasks/create/`,task,{headers: {"Authorization": "Token " + localStorage.getItem("token")}})
)



