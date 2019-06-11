import React from 'react';
import logo from './logo.svg';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import LoginSignUpContainer from "./components/auth/loginSignupContainer"
import TasksContainer from "./components/tasks/tasksContainer"
import Home from './components/home'
import './App.css'

function App() {
  return (
      <div className="h-100">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginSignUpContainer} />
          <Route path="/signup" component={LoginSignUpContainer} />
          <Route path="/tasks" component={TasksContainer} />
        </Switch>
      </div>
  );
}

export default App;
