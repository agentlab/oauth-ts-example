import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { RouteComponentProps } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export function BasicExample() {

  /*let query = useQuery();

  console.log("query=", query);*/

  let name: string = "123";

  console.log(name);

  return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/oauth20/callback?state=wfe&code=fwef">callback</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/oauth20/callback" component={Callback}>
            {/* let name = {useQuery().get("name")}; */}
            {/* <Callback name =  {name}  /> */}
          </Route>
        </Switch>
      </div>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Callback() {
  // const queryString = require('query-string');

  // const params = new URLSearchParams(props.location.search);
  // const foo = params.get('foo'); // bar

  // console.log(this.props.params); // should print "param1=value1&param2=value2...."

  console.log("Callback");
  let location = useLocation();
  console.log("location=", location);
  console.log("search=", location.search);

  let params = useParams();
  console.log("params=", params);

  let sp = new URLSearchParams(location.search.substr(1));
  console.log("sp=", sp);
  let state = sp.get('state') || '';
  let code = sp.get('code') || '';
  console.log("state=", state);

  return (
    <div>
      <h2>callback state={state} code={code}</h2>
    </div>
  );
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
