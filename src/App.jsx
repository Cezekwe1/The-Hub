import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, Redirect, Switch, Link, HashRouter } from "react-router-dom";
import LoginSignUpContainer from "./components/auth/loginSignupContainer";
import TasksContainer from "./components/tasks/tasksContainer";
import Home from "./components/home";
import "./App.css";
import PrivateRoute from "./privateRoute";
import NonPrivateRoute from "./nonPrivateRoute"
import Nav from "./components/nav/navBarContainer";
import ProfileContainer from "./components/profile/profileContainer"
import {withRouter} from "react-router-dom"

class App extends Component {
  constructor(props) {
    super(props);
    this._redirectIfLoggedOut = this.redirectIfLoggedOut.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this)
    
  }
  componentWillMount() {
    this.props.checkAuthState();
  }

  redirectIfLoggedOut = (nextState, replace) => {
    if (!this.props.isAuthenticated) {
      replace("/");
    }
  };

  

  showNavBar() {
    var nav;

    if (this.props.isAuthenticated) {
      nav = <Nav history={this.props.history}/>;
    } else {
      nav = "";
    }
    return nav;
  }

  render() {
    var nav = this.showNavBar();
    return (
      <div className="h-100">
        {nav}
        <Switch>
          <NonPrivateRoute exact path="/" component={Home} isAuthenticated={this.props.isAuthenticated}/>
          <NonPrivateRoute path="/login" component={LoginSignUpContainer} isAuthenticated={this.props.isAuthenticated}/>
          <NonPrivateRoute path="/signup" component={LoginSignUpContainer} isAuthenticated={this.props.isAuthenticated}/>
          <PrivateRoute
            path="/users/:id"
            component={ProfileContainer}
            isAuthenticated={this.props.isAuthenticated}
          />
          <PrivateRoute
            path="/tasks"
            component={TasksContainer}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
