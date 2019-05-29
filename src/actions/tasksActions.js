import {GETALL_TASKS_FAILURE, GETALL_TASKS_SUCCESS} from "./types"


const getAllTasksSuccess = (payload) =>({
    type: GETALL_TASKS_SUCCESS,
    payload
})

const getAllTasksFailure = (payload) =>({
    type: GETALL_TASKS_SUCCESS,
    payload
})


const getAllTasksAction = (dispatch)= () =>{

} 
