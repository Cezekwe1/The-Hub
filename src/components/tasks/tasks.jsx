import React, { Component } from 'react'
import Task from './taskDetail'
export default class task extends Component {
    constructor(props){
        super(props)
        this.state = { myTasks: []}
    }
    componentWillMount(){
        this.props.getTasks()
        
    }
    render() {
        
        return (
            <div className="bg-info h-100">
                {this.props.tasks.myTasks.map(task =>{return <Task props={task}/>})}
                {this.props.tasks.orgTasks.map(task =>{ return <Task props={task}/>})}
            </div>
        )
    }
}
