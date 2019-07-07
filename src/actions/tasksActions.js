import {
  GETALL_TASKS_FAILURE,
  GETALL_TASKS_SUCCESS,
  DEL_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  MAKE_TASK_SUCCESS,
  MAKE_TASK_FAILURE
} from "./types";
import * as Task_Util from "../utilities/task_util";

const getAllTasksSuccess = payload => ({
  type: GETALL_TASKS_SUCCESS,
  payload
});

const getAllTasksFailure = payload => ({
  type: GETALL_TASKS_FAILURE,
  payload
});

const delTaskSuccess = id => ({
  type: DEL_TASK_SUCCESS,
  payload: id
});

const updateTaskSuccess = newInfo => ({
  type: UPDATE_TASK_SUCCESS,
  payload: newInfo
});

const makeTaskSuccess = newTask => ({
  type: MAKE_TASK_SUCCESS,
  payload: newTask
});

const makeTaskFailure = error => ({
  type: MAKE_TASK_FAILURE,
  payload: error
});

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
export const getAllTasksAction = () => dispatch => {
  return Task_Util.getTasks()
    .then(res => {
      var data = res.data;
      dispatch(getAllTasksSuccess(data));
    })
    .catch(err => {
      dispatch(getAllTasksFailure(err.message));
    });
};

export const delTask = id => dispatch => {
  return Task_Util.delTask(id).then(data => {
    
    dispatch(delTaskSuccess(id));
  });
};

export const updateTask = (id, info) => dispatch => {
  return Task_Util.updateTask(id, info).then(data => {
    dispatch(updateTaskSuccess(data));
  });
};

export const makeTask = task => dispatch => {
  return Task_Util.makeTask(task).then((res)=>{
      dispatch(makeTaskSuccess(res.data))
  }).catch((err)=>{makeTaskFailure(err)})
};
