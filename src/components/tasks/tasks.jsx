import React, { Component } from "react";
import Task from "./taskDetail";
import CreateTask from "./createTask";
export default class task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myTasks: [],
      orgTasks: [],
      creating: false
    };
    this.removeMyTask = this.removeMyTask.bind(this);
    this.discardTask = this.discardTask.bind(this);
    this.addMyTask = this.addMyTask.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentWillMount() {
    this.props.getTasks().then(() => {
      this.setState({
        myTasks: this.props.tasks.myTasks,
        orgTasks: this.props.tasks.orgTasks
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.auth.current_organization &&
      nextProps.auth.current_organization.id !=
        this.props.auth.current_organization.id
    ) {
      this.props.getTasks().then(() => {
        this.setState({
          myTasks: this.props.tasks.myTasks,
          orgTasks: this.props.tasks.orgTasks
        });
      });
    }
  }
  componentDidUpdate(nextProps, prevProps) {
    
    if (prevProps.orgTasks != nextProps.tasks.orgTasks) {
      this.setState({
        orgTasks: nextProps.tasks.orgTasks
      });
    }
  }

  openModal(val) {
    this.setState({
      creating: val
    });
  }

  updateModal() {
    var modal;
    if (this.state.creating) {
      modal = (
        <CreateTask
          members={this.props.auth.organization_members}
          addMyTask={this.addMyTask}
          makeTask={this.props.makeTask}
          openModal={this.openModal}
          user={this.props.auth.user}
          org={this.props.auth.current_organization}
        />
      );
    } else {
      modal = "";
    }
    return modal;
  }
  render() {
    var modal = this.updateModal();
    return (
      <div className="bg-white h-100 p-3 container-fluid">
        <button
          onClick={() => this.openModal(true)}
          className="btn btn-sm btn-primary float-right"
        >
          Create Task
        </button>
        {modal}
        <div className="row h-100">
          {this.state.orgTasks.map(task => {
            
            return (
              <div className="col-3">
                <Task
                  key={task.id}
                  task={task}
                  addMyTask={this.addMyTask}
                  removeMyTask={this.removeMyTask}
                  username={this.props.auth.user.username}
                  addMyTask={this.addMyTask}
                  discardTask={this.discardTask}
                  deleteTask={this.props.delTask}
                  members={this.props.auth.organization_members}
                  updateTask={this.props.updateTask}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  removeMyTask(task) {
    let init = false;
    let idx = null;
    for (let i = 0; i < this.state.myTasks.length; i++) {
      let t = this.state.myTasks[i];
      if (t.id == task.id) {
        idx = i;
        init = true;
      }
    }

    if (!init) {
      return;
    }
    let new_arr = this.state.myTasks;
    new_arr.splice(idx, 1);
    this.setState({
      myTasks: new_arr
    });
  }

  discardTask(task) {
    let new_arr = this.state.orgTasks;
    let idx = new_arr.indexOf(task);
    new_arr.splice(idx, 1);
    this.setState({
      orgTasks: new_arr
    });
  }

  addMyTask(task) {
    for (let t of this.state.myTasks) {
      if (t.id == task.id) {
        return;
      }
    }
    let new_arr = this.state.myTasks;
    new_arr.push(task);
    this.setState({
      myTasks: new_arr
    });
  }
}
