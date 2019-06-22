import React, { Component } from "react";
import Task from "./taskDetail";
export default class task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myTasks: [],
      orgTasks: []
    };
    this.removeMyTask = this.removeMyTask.bind(this)
    this.discardTask = this.discardTask.bind(this)
    this.addMyTask = this.addMyTask.bind(this)
  }

  componentWillMount() {
    this.props.getTasks().then(()=>{
      this.setState({
        myTasks: this.props.tasks.myTasks,
        orgTasks: this.props.tasks.orgTasks
      })
    });
  }
  render() {
    console.log(this.state, this.props.tasks.orgTasks);
    return (
      <div className="bg-white h-100 container">
        <h2 className="mb-5">My Tasks</h2>
        <div className="row h-50">
          {this.state.myTasks.map(task => {
            return (
              <Task
                key={task.id}
                task={task}
                removeMyTask={this.removeMyTask}
                username={this.props.auth.username}
                addMyTask={this.addMyTask}
                discardTask={this.discardTask}
                deleteTask={this.props.delTask}
                members={this.props.auth.organization_members}
                updateTask={this.props.updateTask}
                myId={this.props.auth}
              />
            );
          })}
        </div>
        <h2 className="mb-5">Organization Tasks</h2>
        <div className="row h-50">
          {this.state.orgTasks.map(task => {
            return (
              <Task
                key={task.id}
                task={task}
                addMyTask={this.addMyTask}
                removeMyTask={this.removeMyTask}
                username={this.props.auth.username}
                addMyTask={this.addMyTask}
                discardTask={this.discardTask}
                deleteTask={this.props.delTask}
                members={this.props.auth.organization_members}
                updateTask={this.props.updateTask}
              />
            );
          })}
        </div>
      </div>
    );
  }

  removeMyTask(task) {
      let init = false
      let idx = null
      for (let i = 0 ; i < this.state.myTasks.length; i++){
          let t = this.state.myTasks[i]
          if (t.id == task.id){
            idx = i
            init = true
          }
      }

      if (!init){
        return
      }
      let new_arr = this.state.myTasks;
      new_arr.splice(idx, 1);
      this.setState({
        myTasks: new_arr
      });
    
  }

  discardTask(task) {
    if (this.state.myTasks.includes(task)) {
      let new_arr = this.state.myTasks;
      let idx = new_arr.indexOf(task);
      new_arr.splice(idx, 1);
      this.setState({
        myTasks: new_arr
      });
    }
    let new_arr = this.state.orgTasks;
    let idx = new_arr.indexOf(task);
    new_arr.splice(idx, 1);
    this.setState({
      orgTasks: new_arr
    });
  }

  addMyTask(task){
    for (let t of this.state.myTasks){
      if(t.id == task.id){
        return
      }
    }
    let new_arr = this.state.myTasks
    new_arr.push(task)
    this.setState({
      myTasks: new_arr
    })
  }
}
