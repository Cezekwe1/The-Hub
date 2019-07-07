import React, { Component } from "react";

export class createOrg extends Component {
  constructor(props) {
      super(props)
      this.state = {name:""}
      this.submit = this.submit.bind(this)
  }

  
  render() {
    return (
      <div className="react-modal">
        <span onClick={() => this.props.openModal(false)} className="close">
          &times;
        </span>
        <div className="inner-modal">
          <h2 className="text-center font-weight-bold mb-1">Write A Task</h2>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                onChange={this.update("name")}
                value={this.state.name}
                type="text"
              />
            </div>
            <button className="btn btn-primary mt-5" onClick={this.submit}>
              Save
            </button>
            <button
              className="btn btn-primary ml-2 mt-5"
              onClick={() => this.props.openModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }


  update(field){
      return e =>{
          this.setState({
              [field]: e.target.value
          })
      }
  }
  submit(){
      this.props.addOrg(this.state).then(()=>{
          this.props.openModal(false)
      })
  }
}

 

export default createOrg;
