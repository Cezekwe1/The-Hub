import React, { Component } from "react";
import logo from "../logo.png"
import red_logo from "../red_logo.png"
import logo_trans from "../logo_transparent.png"
import red_logo_trans from "../red_logo_transparent.png"
import {NavLink} from 'react-router-dom';
export default class Home extends Component {
  render() {
    return (
      <div className="h-100 bg-danger">
        <img src={red_logo_trans} alt="" className="rounded"/>
        <NavLink to={'login'}className="btn btn-outline-warning">Login</NavLink>
        <NavLink to={'signup'}className="btn btn-outline-warning m-2">SignUp</NavLink>
      </div>
    );
  }
}
