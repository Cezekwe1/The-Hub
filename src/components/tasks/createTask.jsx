import React, { Component } from "react";
import Search from "./search";
export class createTask extends Component {
  constructor(props) {
    super(props);
    let org_id = this.props.org ? this.props.org.id : null;
    this.state = {
      title: "",
      description: "",
      owners: [],
      owner_objs: [],
      organization: org_id,
      noOrg: false
    };
    this.addOwner = this.addOwner.bind(this);
    this.submit = this.submit.bind(this);
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
              <label>Title</label>
              <input
                className="form-control"
                onChange={this.update("title")}
                value={this.state.title}
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                onChange={this.update("description")}
                name=""
                id=""
                cols="30"
                rows="10"
                value={this.state.description}
              />
            </div>
            <label>Assign Owners:</label>
            <Search
              removeOwner={this.removeOwner}
              addOwner={this.addOwner}
              members={this.props.members}
            />
            <div>
              <span className="text-muted">owners: </span>
              {this.state.owner_objs.map(owner => {
                return (
                  <span
                    className="badge badge-pill badge-success"
                    key={owner.id}
                  >
                    {owner.username}
                  </span>
                );
              })}
            </div>
            <div>
              <div className="form-group mt-3 form-check">
                <input
                  className="form-check-input"
                  onChange={this.update("noOrg")}
                  value={true}
                  checked={this.state.noOrg}
                  type="checkbox"
                />
                <label className="form-check-label">Just Me</label>
              </div>
              <div className="form-group form-check">
                <input
                  className="form-check-input"
                  onChange={this.update("noOrg")}
                  value={false}
                  checked={!this.state.noOrg}
                  type="checkbox"
                />
                <label className="form-check-label">Organization</label>
              </div>
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

  addOwner(owner) {
    let new_arr = this.state.owners;
    let other_arr = this.state.owner_objs;
    new_arr.push(owner.id);
    other_arr.push(owner);
    this.setState({
      owners: new_arr,
      owner_objs: other_arr
    });
  }

  update(field) {
    return e => {
      let val = e.target.value
      if (val== "false" || val=="true"){
        val= JSON.parse(val)
      }
      this.setState({
        [field]: val
      });
    };
  }

  removeOwner(owner) {}
  submit() {
    var { title, description, owners, organization, noOrg } = this.state;
    this.props
      .makeTask({ title, description, owners, organization, noOrg})
      .then(res => {
        this.props.openModal(false);
      });
  }
}

export default createTask;
