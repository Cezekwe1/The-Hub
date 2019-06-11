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

