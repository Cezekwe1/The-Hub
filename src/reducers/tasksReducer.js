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
            console.log(action.payload)
            return {
                ...newState,
                myTasks : [...action.payload.my_tasks],
                orgTasks: [...action.payload.org_tasks] 
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