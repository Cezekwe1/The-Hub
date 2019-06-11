import React, { Component } from 'react'
import Task from './taskDetail'
export default class task extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getTasks()
    }
    render() {
        
        return (
            <div className="bg-info h-100">
                {this.props.tasks.myTasks.map(task =>{return <Task key={task.id} props={task}/>})}
                {this.props.tasks.orgTasks.map(task =>{ return <Task key={task.id} props={task}/>})}
            </div>
        )
    }
}
