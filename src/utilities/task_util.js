import axios from 'axios'
// export const getTasks = () => (
//     fetch("http://127.0.0.1:8000/tasks/",{
//         method: "GET",
//         credentials: "include"
//     })
// )


export const getTasks = () =>(
    
    axios.get("http://127.0.0.1:8000/tasks/",{headers: {"Authorization": "Token " + localStorage.getItem("token")}})
)

export const delTask = (id) =>(
    axios.delete(`http://127.0.0.1:8000/tasks/delete/${id}`,{headers: {"Authorization": "Token " + localStorage.getItem("token")}})
)

export const updateTask = (id, info) =>(
    axios.post(`http://127.0.0.1:8000/tasks/update/${id}/`, info, {headers: {"Authorization": "Token " + localStorage.getItem("token")}})
)

