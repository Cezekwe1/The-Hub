import {connect} from 'react-redux'
import * as AuthActions from '../../actions/authActions'
import CreateOrg from "./createOrg"

const mapStateToProps = (state) =>({})
const mapDispatchToProps = (dispatch) =>({
    addOrg: (org) => dispatch(AuthActions.addOrg(org))
})

export default connect(mapStateToProps,mapDispatchToProps)(CreateOrg)