import {GETALL_TASKS_FAILURE, GETALL_TASKS_SUCCESS} from '../actions/types'
const intialState = {
    myTasks : [],
    orgTasks : [],
    tasksErrors: []
}


export default (state = intialState, action) =>{
    let newState = state
    Object.freeze(state)
    switch(action.type){
        case GETALL_TASKS_SUCCESS:
            console.log(action.payload.data)
            return {
                ...newState,
                myTasks : [...state.myTasks,...action.payload.data],
                orgTasks: [...state.myTasks,...action.payload["data"]] 
            }
        break; 
        case GETALL_TASKS_FAILURE:
                return {
                    ...state,
                    tasksErrors: [...state.tasksErrors,action.payload]
                }
        break;
        default:
            return state
    }
}