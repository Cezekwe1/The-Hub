import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const initialState = {}
const middleware = [thunk]
const token = window.localStorage.getItem("token")
const current_organization = JSON.parse(window.localStorage.getItem("current_organization")) 
const organizations = JSON.parse(window.localStorage.getItem("organizations")) || []
const friends = JSON.parse(window.localStorage.getItem("friends")) || []
const organization_members = JSON.parse(window.localStorage.getItem("organization_members")) || []
if (token){
    initialState["auth"] = {
        token: token,
        organizations: organizations,
        current_organization: current_organization,
        friends: friends,
        organization_members: organization_members,
        errors: null
    }
}
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))



export default store