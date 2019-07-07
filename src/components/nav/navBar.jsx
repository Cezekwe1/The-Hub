import React, { Component } from "react";
import { withRouter } from "react-router";
import CreateOrg from "../organizations/orgContainer";
import { removeInvites } from "../../utilities/profile_util";
import { NavLink } from "react-router-dom";
import red_logo from "../../red_logo.png";
export class navBar extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.selectOrg = this.selectOrg.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      filteredMembers: this.props.filteredMembers,
      modal: false,
      notifications: false,
      orgInvites: [],
      friendRequests: [],
      accepted_org_invites: [],
      accepted_friend_requests: [],
      seen: false,
      menu: false
    };
    this.openModal = this.openModal.bind(this);
    this.openNotificationsList = this.openNotificationsList.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  search() {
    return e => {
      var val = e.target.value;
      if (val.match(/^[a-zA-Z]+$/)) {
        this.props.search(val).then(() => {
          this.setState({
            filteredMembers: this.props.filteredMembers
          });
        });
      } else {
        this.props.clearOutSearch();
        this.setState({
          filteredMembers: []
        });
      }
    };
  }

  componentWillMount() {
    this.props.getNotifications().then(() => {
      
      this.setState({
        orgInvites: this.props.notifications.orgInvites,
        friendRequests: this.props.notifications.friendRequests,
        accepted_org_invites: this.props.notifications.acceptedOrgInvites,
        accepted_friend_requests: this.props.notifications
          .acceptedFriendRequests
      });
    });
  }

  componentWillReceiveProps(nextProps) {
   
  }

  componentDidUpdate(nextProps, prevProps) {
    if (nextProps.filteredMembers != prevProps.filteredMembers) {
      this.setState({
        filteredMembers: nextProps.filteredMembers
      });
    }
  }

  goToProfile(id) {
    return e => {
      
      this.props.history.push(`/users/${id}`);
      this.props.clearOutSearch();
      this.setState({ filteredMembers: [] });
    };
  }

  selectOrg() {
    return e => {
      let val = e.target.value;
      if (val != "false") {
        
        this.props.updateOrg(parseInt(val)).then(() => {
          this.forceUpdate();
        });
      }
    };
  }

  loadModal() {
    var modal;
    if (this.state.modal) {
      modal = <CreateOrg openModal={this.openModal} />;
    } else {
      modal = "";
    }
    return modal;
  }

  openModal(val) {
    this.setState({
      modal: val
    });
  }

  emptyNotification() {
    if (!this.state.seen) {
      removeInvites({
        accepted_friend_requests: this.state.accepted_friend_requests,
        accepted_org_invites: this.state.accepted_org_invites
      }).then(() => {
        this.setState({
          seen: true
        });
      });
    }
  }

  showNotifications() {
    var notificationsList;
    var length =
      this.state.orgInvites.length +
      this.state.friendRequests.length +
      this.state.accepted_org_invites.length +
      this.state.accepted_friend_requests.length;
    if (this.state.notifications && length > 0) {
      notificationsList = (
        <ul className="list-group pop position-absolute">
          {this.state.orgInvites.map(invite => {
            return (
              <li className="list-group-item">
                {invite.inviter.username} has invited you to join{" "}
                {invite.organization.name}{" "}
                <button
                  onClick={() =>
                    this.props.respondOrgInvite({
                      id: invite.id,
                      accepted: true
                    })
                  }
                  className="btn btn-success"
                >
                  Join
                </button>
                <button
                  onClick={() =>
                    this.props.respondOrgInvite({
                      id: invite.id,
                      accepted: false
                    })
                  }
                  className="btn btn-danger"
                >
                  Reject
                </button>
              </li>
            );
          })}
          {this.state.friendRequests.map(invite => {
            return (
              <li className="list-group-item">
                {invite.inviter.username} wants to be friends{" "}
                <button
                  onClick={() =>
                    this.props.respondFriendRequest({
                      id: invite.id,
                      accepted: true
                    })
                  }
                  className="btn btn-success"
                >
                  Accept
                </button>{" "}
                <button
                  onClick={() =>
                    this.props.respondFriendRequest({
                      id: invite.id,
                      accepted: false
                    })
                  }
                  className="btn btn-danger"
                >
                  Reject
                </button>{" "}
              </li>
            );
          })}
          {this.state.accepted_friend_requests.map(invite => {
            return (
              <li className="list-group-item">
                {invite.target.username} has accepted your friend request
              </li>
            );
          })}
          {this.state.accepted_org_invites.map(invite => {
            return (
              <li className="list-group-item">
                {invite.target.username} has joined {invite.organization.name}
              </li>
            );
          })}
        </ul>
      );
    } else {
      notificationsList = "";
    }
    return notificationsList;
  }

  logout() {
    this.props.clearOutSearch();
    this.props.logout().then(() => {
      this.props.history.push("/");
    });
  }

  loadMenu() {
    var menu;
    if (this.state.menu) {
      menu = (
        <ul className="list-group w-100 pop  mt-1 position-absolute">
          <li
            className="list-group-item"
            onClick={() => {
              this.openModal(true);
            }}
          >
            Create Org
          </li>
          <li className="list-group-item" onClick={this.logout}>
            Logout
          </li>
        </ul>
      );
    } else {
      menu = "";
    }
    return menu;
  }
  toggleMenu() {
    this.setState({
      menu: !this.state.menu
    });
  }

  openNotificationsList() {
    this.setState({
      notifications: !this.state.notifications
    });
    this.emptyNotification();
  }

  render() {
    var modal = this.loadModal();
    var notifications = this.showNotifications();
    var menu = this.loadMenu();
    return (
      <nav className="navbar  navbar-dark bg-dark">
        <NavLink to="/tasks">
          {" "}
          <img src={red_logo} width="20px" className="rounded " />
          <h4>The Hub</h4>
        </NavLink>
        {modal}
        <form className="form-inline">
          <select onChange={this.selectOrg()} className="form-control">
            <option value={false}>select organization</option>
            {this.props.auth.organizations.map(org => {
              return <option value={org.id}> {org.name} </option>;
            })}
          </select>
        </form>
        <span className="navbar-text font-weight-bold text-uppercase">
          {this.props.auth.current_organization
            ? this.props.auth.current_organization.name
            : ""}
        </span>
        <div className="position-relative">
          <form className="form-inline w-100">
            <input
              onChange={this.search()}
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            {/* <button
              className="btn btn-outline-primary my-2 my-sm-0"
              type="submit"
            >
              Search
            </button> */}
          </form>
          <ul className="list-group w-100 pop  mt-1 position-absolute ">
            {this.state.filteredMembers.map(member => {
              return (
                <li
                  onClick={this.goToProfile(member.id)}
                  className="list-group-item"
                >
                  {member.username}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="position-relative">
          <button
            onClick={this.openNotificationsList}
            type="button"
            className="btn btn-primary"
          >
            Notifications{" "}
            <span className="badge badge-light">
              {this.state.seen == false
                ? this.state.orgInvites.length +
                  this.state.friendRequests.length +
                  this.state.accepted_org_invites.length +
                  this.state.accepted_friend_requests.length
                : 0}
            </span>
          </button>
          {notifications}
        </div>
        <div className="position-relative">
          <button onClick={this.toggleMenu} className="btn btn-lg btn-primary py-1 px-5">Menu</button>
          {menu}
        </div>
      </nav>
    );
  }
}

export default withRouter(navBar);
