import React, { MouseEvent } from "react";
import "./App.css";
import { Guid } from "guid-typescript";

import { RestClient } from "./RestClient";

import {
  Switch,
  Route,
  Link,
  // useParams,
  useLocation
} from "react-router-dom";
import { AxiosRequestConfig, AxiosResponse } from "axios";

// let httpc: httpm.HttpClient = new httpm.HttpClient('vsts-node-api');

let restClient: RestClient = new RestClient();

export function BasicExample() {

  return (
    <div>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <hr />

      <button onClick={handleAuthClick} > Authorize </button>
      <button onClick={getProtectedResourse} > GetProtectedResourse  </button>
      <button onClick={refreshToken} > RefreshToken  </button>
      <button onClick={logout} > Logout  </button>

      <Switch>
        <Route path="/about" component={About} />
        <Route path="/oauth20/callback" component={Callback}>
        </Route>
      </Switch>
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

  let sp = new URLSearchParams(useLocation().search);
  console.log("sp=", sp);
  let state: string = sp.get('state') || '';
  console.log("state=", state);
  let code = sp.get('code') || '';
  console.log("code=", code);

  exchangeCode(code);

  return (
    <div>
      <h2>callback state={state} code={code}</h2>
    </div>

  );
}

function handleAuthClick(event: MouseEvent) {

  let baseUrl: string = "https://example.com:9443/oauth2/authorize";
  let state: string = Guid.create().toString();
  let client_id: string = "Ynio_EuYVk8j2gn_6nUbIVQbj_Aa";
  let redirectUri: string = "http://example.com:3000/oauth20/callback";

  let authUrl: string = baseUrl + "?response_type=code"
    + "&client_id=" + client_id
    + "&state=" + state
    + "&scope=openid"
    + "&redirect_uri=" + redirectUri;
  window.open(authUrl, "_self")
}

async function exchangeCode(code: string) {
  let data: string = 'grant_type=authorization_code'
    + '&code=' + code
    + '&redirect_uri=http://example.com:3000/oauth20/callback';

  let requestConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
  }

  console.log("document.cookie");
  console.log(document.cookie + " !");
  console.log("document.cookie");

  try {
    let response: AxiosResponse = await restClient.post("http://example.com:8181/oauth2/token", encodeURI(data), requestConfig);
    if (response.status === 200) {
      alert("Successful auth");
    } else {
      alert(JSON.stringify(response.data))
    }
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

async function refreshToken()  {
  let data: string = 'grant_type=refresh_token';

  let requestConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  try {
    let response: AxiosResponse = await restClient.post("http://example.com:8181/oauth2/token", encodeURI(data), requestConfig);
    if (response.status === 200) {
      alert("Successful refresh");
    } else {
      alert(JSON.stringify(response.data))
    }
  } catch (error) {
    console.log(error);
  }
}

async function logout()  {

}
