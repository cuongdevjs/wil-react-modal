import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Basic from "./Basic";
import OpenFromFooJs from "./OpenFromFooJs";
import Animation from "./Animation";
import Placement from "./Placement";
import FullScreen from "./FullScreen";
import Nested from "./Nested";
import AutoVisible from "./AutoVisible";
import CloseTimeOut from "./CloseTimeOut";
import RouterModal from "./RouterModal";

function NavLink({ children, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
  return (
    <Link
      to={to}
      style={{
        color: match ? "red" : "blue",
        borderBottom: `2px solid ${match ? "red" : "transparent"}`
      }}
    >
      {children}
    </Link>
  );
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <h1>
            <span>Wil React Modal </span>
          </h1>
          <div>Modal Component For React</div>
          <nav className="nav">
            <NavLink to="/" activeOnlyWhenExact>
              Basic
            </NavLink>
            <NavLink to="/open-from-foojs">Open Modal from other file</NavLink>
            <NavLink to="/animation">Animation</NavLink>
            <NavLink to="/placement">Placement</NavLink>
            <NavLink to="/fullscreen">FullScreen</NavLink>
            <NavLink to="/nested">Nested</NavLink>
            <NavLink to="/autovisible">Auto Visible</NavLink>
            <NavLink to="/closetimeout">Close TimeOut</NavLink>
            <NavLink to="/routermodal">Router Modal Example</NavLink>
          </nav>
          <Switch>
            <Route path="/" exact>
              <Basic />
            </Route>
            <Route path="/open-from-foojs">
              <OpenFromFooJs />
            </Route>
            <Route path="/animation">
              <Animation />
            </Route>
            <Route path="/placement">
              <Placement />
            </Route>
            <Route path="/fullscreen">
              <FullScreen />
            </Route>
            <Route path="/nested">
              <Nested />
            </Route>
            <Route path="/autovisible">
              <AutoVisible />
            </Route>
            <Route path="/closetimeout">
              <CloseTimeOut />
            </Route>
            <Route path="/routermodal">
              <RouterModal />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
