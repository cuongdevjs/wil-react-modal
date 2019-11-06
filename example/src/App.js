import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import Basic from "./Basic";
import OpenFromFooJs from "./OpenFromFooJs";
import Animation from "./Animation";
import Placement from "./Placement";
import FullScreen from "./FullScreen";
import Nested from "./Nested";
import AutoVisible from "./AutoVisible";
import CloseTimeOut from "./CloseTimeOut";

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          color: isCurrent ? "red" : "blue",
          borderBottom: `2px solid ${isCurrent ? "red" : "transparent"}`
        }
      };
    }}
  />
);
export default class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>
          <span>Wil React Modal </span>
        </h1>
        <div>Modal Component For React</div>
        <nav className="nav">
          <NavLink to="/">Basic</NavLink>
          <NavLink to="/open-from-foojs">Open Modal from other file</NavLink>
          <NavLink to="animation">Animation</NavLink>
          <NavLink to="placement">Placement</NavLink>
          <NavLink to="fullscreen">FullScreen</NavLink>
          <NavLink to="nested">Nested</NavLink>
          <NavLink to="autovisible">AutoVisible</NavLink>
          <NavLink to="closetimeout">CloseTimeOut</NavLink>
        </nav>
        <Router>
          <Basic path="/" />
          <OpenFromFooJs path="open-from-foojs" />
          <Animation path="animation" />
          <Placement path="placement" />
          <FullScreen path="fullscreen" />
          <Nested path="nested" />
          <AutoVisible path="autovisible" />
          <CloseTimeOut path="closetimeout" />
        </Router>
      </div>
    );
  }
}
