import { combineReducers } from 'redux'
import authReducer from './authReducer'
import tasksReducer from './tasksReducer'
import searchReducer from './searchReducer'
import profileReducer from './profileReducer'
import notificationsReducer from './notificationsReducer'
export default combineReducers({
    auth: authReducer,
    tasks: tasksReducer,
    search: searchReducer,
    profile: profileReducer,
    notifications: notificationsReducer
})