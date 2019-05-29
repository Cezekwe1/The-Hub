import React from 'react';
import logo from './logo.svg';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import LoginLogoutContainer from "./components/auth/loginSignup"
import Home from './components/home'
import './App.css'

function App() {
  return (
      <div className="h-100">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginLogoutContainer} />
          <Route path="/signup" component={LoginLogoutContainer} />
        </Switch>
      </div>
  );
}

export default App;
