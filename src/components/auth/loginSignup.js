import {connect} from 'react-redux'
import LoginSignup from './loginSignup.jsx'
import * as AuthActions from "../../actions/authActions"
const mapStateToProps = (state, {location}) => {
    const formType = location.pathname.slice(1)
    return {
      formType  
    }
}

const mapDispatchToProps = (dispatch, {location}) =>{
    const processType = (location.pathname.slice(1) == 'login')? AuthActions.login: AuthActions.signup
    return {
        process: user => dispatch(processType(user))
    }

}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginSignup)