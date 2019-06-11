import {GETALL_TASKS_FAILURE, GETALL_TASKS_SUCCESS} from "./types"
import * as Task_Util from "../utilities/task_util"

const getAllTasksSuccess = (payload) =>({
    type: GETALL_TASKS_SUCCESS,
    payload
})

const getAllTasksFailure = (payload) =>({
    type: GETALL_TASKS_FAILURE,
    payload
})


// export const getAllTasksAction = () => (dispatch) => {
//     return Task_Util.getTasks().then( data => {
//         if (!data.ok){
//             console.log("it didnt word")
//             throw new Error("its an error")
//         }else{
//             console.log("it worked")
//             return data.json()
//         }
//     }).then(data=> {dispatch(getAllTasksSuccess(data))}).catch(err => {dispatch(getAllTasksFailure(err.message))})
// } 
export const getAllTasksAction = () => (dispatch) => {
    return Task_Util.getTasks().then(data=> {
        console.log(data)
        dispatch(getAllTasksSuccess(data))}).catch(err => {dispatch(getAllTasksFailure(err.message))})
} 