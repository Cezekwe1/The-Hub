import React , {Component} from "react";
import Search from "./search"
import { throwStatement } from "@babel/types";

export default class TaskDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {title: this.props.task.title, description: this.props.task.description, updating: false, del_owners: [], new_owners: [], owners: this.props.task.owners, completed: this.props.task.completed}
    this.addOwner = this.addOwner.bind(this)
    this.removeOwner = this.removeOwner.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }

  updateOrDisplay = () =>{
    var actionBtn1, actionBtn2,actionBtn3 , owners_list,search, title,  description
    if (!this.state.updating){
        actionBtn1 = <button onClick={this.editTask(true)}  className="btn btn-sm  btn-primary mr-2 mt-5">Update</button>
        actionBtn2 = <button className="" onClick={this.deleteTask} className="btn btn-sm btn-primary mt-5">Discard</button>
        actionBtn3 = ""
        search = "" 
        owners_list = <p className="text-muted"> owners: {this.state.owners.map((owner)=> {return <span className="badge badge-pill badge-primary mr-2" key={owner.id}>{owner.username}</span>})}</p>
        title = <h2 className="card-title">{this.props.task.title}</h2>
        description = <p className="card-text mb-5">{this.props.task.description}</p>
    }else{
        actionBtn1 = <button onClick={this.submit()}className="btn btn-sm btn-primary mr-2">Save</button>
        actionBtn2 = <button onClick={this.editTask(false)} className="btn btn-sm btn-primary">Cancel</button>
        actionBtn3 = <div><div className="form-group form-check"><input className="form-check-input" onChange={this.updateStatus(true)} checked={this.state.completed} type="checkbox"/><label className="form-check-label">True</label></div><div className="form-group form-check"><input className="form-check-input" onChange={this.updateStatus(false)} checked={!this.state.completed} type="checkbox"/><label className="form-check-label">False</label></div></div>
        search = <Search removeOwner={this.removeOwner} addOwner={this.addOwner} members={this.props.members}/>
        owners_list = <p className="text-muted">owners: {this.props.task.owners.map((owner)=> {return <button   className="btn btn-sm  rounded bg-danger mr-2 mb-2"onClick={() => this.delOwner(owner)}key={owner.id}>{owner.username} <span aria-hidden="true">&times;</span></button>})}</p>
        title = <div className="input-group mb-3"> <div className="input-group-prepend"> <span className="input-group-text"> Title</span></div><input onChange={this.update("title")} value={this.state.title} /></div>
        description = <div className="input-group mb-3"><textarea  className="form-control"onChange={this.update("description")}value={this.state.description}></textarea></div>
    }

    return {actionBtn1, actionBtn2, actionBtn3,owners_list,search, title, description}
  }

    update(field){
        return e => this.setState({
            [field] : e.currentTarget.value
        })
    }

    submit(){
      return e => {
       
        this.props.updateTask(this.props.task.id, {title:this.state.title, 
          description:this.state.description, 
          del_owners: this.state.del_owners, 
          new_owners: this.state.new_owners, 
          completed: this.state.completed }).then(()=>{
            for(let owner of this.state.owners){
              if (owner.username == this.props.username){
                let newTask = {"id":this.props.task.id, 
                "description": this.state.description, 
                "title":this.state.title, 
                "organization":this.props.task.org_id, 
                "owners":  this.props.task.owners, 
                "completed":this.state.completed}
                this.props.addMyTask(newTask)
                break;
              }
             
            }
            this.setState({
              "updating" : false
            })
          })
      }
    }
    deleteTask(){
      this.props.deleteTask(this.props.task.id).then(()=>{
        this.props.discardTask(this.props.task)
      })
    }
    updateStatus(val){
      return e => this.setState({
        "completed": val
      })
    }


    editTask(val){
        return () => this.setState({
            updating: val
        })
    }

    delOwner(owner){
      this.props.updateTask(this.props.task.id, {del_owners:[owner.id]}).then(()=>{
        let new_arr =  this.state.owners
        let idx = new_arr.indexOf(owner)
        new_arr.splice(idx,1)
        this.setState({
          owners: new_arr
        })
        this.props.removeMyTask(this.props.task)
      })
    }

    removeOwner(id){
      if (this.state.new_owners.includes(id)){
        let idx = this.state.new_owners.indexOf(id)
        this.setState({
          new_owners: this.state.new_owners.slice(0,idx).concat(this.state.new_owners.slice(idx + 1))
        }) 
      }else{
        this.delOwner(id)
      }
    }

    addOwner(owner){
      for (let old_owner of this.state.owners){
        if (owner.id == old_owner.id){
          return 
        }
      }
      
      this.props.updateTask(this.props.task.id, {new_owners: [owner.id]}).then(()=>{
        let new_arr = this.state.owners
        new_arr.push(owner)
      
        this.setState({
          owners: new_arr
        })
        
      })
      
    }


  render() {

      

      var { actionBtn1, actionBtn2, actionBtn3, owners_list , search , title, description} = this.updateOrDisplay()
    return (
      <div className={(this.state.completed == true) ? "card h-auto done mb-5 w-100": "card h-auto normal mb-5 w-100" }>
        <div className="card-body">
          {title}
            {description}
            {search}
            {owners_list}
            {actionBtn3}
            {actionBtn1}
            {actionBtn2}
        </div>
      </div>
    );
  }
}
