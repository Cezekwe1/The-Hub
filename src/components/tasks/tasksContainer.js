import {connect} from 'react-redux'
import Tasks from "./tasks";
import * as Tasks_Actions from "../../actions/tasksActions"
const mapStateToProps = (state) =>({
    tasks: state.tasks,
    auth: state.auth
})

const mapDispatchToProps = (dispatch) =>({
    getTasks: () => dispatch(Tasks_Actions.getAllTasksAction())
})

export default connect(mapStateToProps,mapDispatchToProps)(Tasks)