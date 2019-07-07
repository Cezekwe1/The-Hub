import {connect} from 'react-redux'
import Tasks from "./tasks";
import * as Tasks_Actions from "../../actions/tasksActions"
const mapStateToProps = (state) =>({
    tasks: state.tasks,
    auth: state.auth
})

const mapDispatchToProps = (dispatch) =>({
    getTasks: () => dispatch(Tasks_Actions.getAllTasksAction()),
    delTask: (id) => dispatch(Tasks_Actions.delTask(id)),
    updateTask: (id,newInfo) => dispatch(Tasks_Actions.updateTask(id,newInfo)),
    makeTask: (task)=> dispatch(Tasks_Actions.makeTask(task))

})

export default connect(mapStateToProps,mapDispatchToProps)(Tasks)