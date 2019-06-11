import React, { Component }  from "react";
import logo from "./logo.svg";
import { Route, Redirect, Switch, Link, HashRouter } from "react-router-dom";
import LoginSignUpContainer from "./components/auth/loginSignupContainer";
import TasksContainer from "./components/tasks/tasksContainer";
import Home from "./components/home";
import "./App.css";
import PrivateRoute from './privateRoute'


class App extends Component {
  constructor(props){
    super(props)
    this._redirectIfLoggedOut = this.redirectIfLoggedOut.bind(this)
  }
  componentWillMount(){
    console.log("im checking")
    this.props.checkAuthState()
  }

  redirectIfLoggedOut = (nextState,replace) =>{
    console.log("i am checking")
    if (!this.props.isAuthenticated){
      replace('/')
    }
  }
  render() {
    return (
      <div className="h-100">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginSignUpContainer} />
          <Route path="/signup" component={LoginSignUpContainer} />
          <PrivateRoute path="/tasks" component={TasksContainer} isAuthenticated={this.props.isAuthenticated}/>
        </Switch>
      </div>
    );
  }
}

export default App;
