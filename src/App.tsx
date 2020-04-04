import React, { MouseEvent } from "react";
import "./App.css";
import * as request from "request-promise-native";
import { Guid } from "guid-typescript";

import {
  Switch,
  Route,
  Link,
  useParams,
  useLocation
} from "react-router-dom";

function handleClick(event: MouseEvent) {

  let baseUrl: string = "https://example.com:9443/oauth2/authorize";
  let state: string = Guid.create().toString();
  let client_id: string = "Ynio_EuYVk8j2gn_6nUbIVQbj_Aa";
  let redirectUri: string = "http://localhost:3000/oauth20/callback";

  let authUrl: string = baseUrl + "?response_type=code"
    + "&client_id=" + client_id
    + "&state=" + state
    + "&scope=openid"
    + "&redirect_uri=" + redirectUri;
  window.open(authUrl, "_self")
}

export function BasicExample() {

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
          <Link to="/oauth20/callback">callback</Link>
        </li>
      </ul>

      <hr />

      <button
        onClick={handleClick}
        // onFocus={onFocus}
        onKeyDown={e => {
          // When using an inline function, the appropriate argument signature
          // is provided for us
        }}
      >
        Click me!
    </button>

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

  console.log("Callback");
  let location = useLocation();
  console.log("location=", location);
  console.log("search=", location.search);

  let params = useParams();
  console.log("params=", params);

  let sp = new URLSearchParams(location.search);
  console.log("sp=", sp);
  let state: string = sp.get('state') || '';
  let code = sp.get('code') || '';
  console.log("state=", state);

  return (
    <div>
      <h2>callback state={state} code={code}</h2>
    </div>
  );
}
