import React, { MouseEvent } from "react";
import { AxiosResponse } from "axios";
import { AuthClient } from "./AuthClient";
import { RestClient } from "./RestClient";

import {
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";


let restClient: RestClient = new RestClient();

let authClient: AuthClient = new AuthClient();

export function BasicExample() {

  return (
    <div>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <hr />

      <button onClick={performAuth} > Authorize </button>
      <button onClick={refreshToken} > RefreshToken  </button>
      <button onClick={userInfo} > UserInfo  </button>
      <button onClick={revokeTokens} > Logout  </button>
      <button onClick={getProtectedResourse} > getProtectedResourse  </button>

      <Switch>
        <Route path="/oauth20/callback" component={Callback}>
        </Route>
      </Switch>
    </div>
  );
}

function Callback() {

  console.log("Callback");

  let sp = new URLSearchParams(useLocation().search);
  let state: string = sp.get('state') || '';
  let code = sp.get('code') || '';

  authClient.exchangeCode(code);

  return (
    <div>
      <h2>callback state={state} code={code}</h2>
    </div>

  );
}

function performAuth(event: MouseEvent) {
  authClient.performAuth();
}

async function refreshToken() {
  try {
    let response: AxiosResponse = await authClient.refreshToken();
    alert(JSON.stringify(response.data));

  } catch (error) {
    console.log(error);
  }
}

async function revokeTokens() {
  try {
    let response: AxiosResponse = await authClient.revokeTokens();
    if (response.status === 200) {
      alert("Successful logout");
    } else {
      alert(JSON.stringify(response.data))
    }
  } catch (error) {
    console.log(error);
  }
}

async function userInfo() {
  try {
    let response: AxiosResponse = await authClient.userInfo();
    alert(JSON.stringify(response.data))

  } catch (error) {
    console.log(error);
  }
}

async function getProtectedResourse(event: MouseEvent) {
  try {
    let response: AxiosResponse = await restClient.get("http://example.com:8181/booking");
    alert(JSON.stringify(response.data))
  } catch (error) {
    console.log(error);
  }
}


