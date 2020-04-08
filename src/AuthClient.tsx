import { RestClient } from "./RestClient";
import { Guid } from "guid-typescript";
import { AxiosResponse, AxiosRequestConfig } from "axios";

export class AuthClient {

    private static authUrl: string = "https://example.com:9443/oauth2/authorize"; // wso2
    private static redirectUrl: string = "http://example.com:3000/oauth20/callback"; //frontend URL

    private static baseUrl: string = "http://example.com:8181/oauth2"; //backend URL
    private static tokenUrl: string = AuthClient.baseUrl + "/token";
    private static revokeUrl: string = AuthClient.baseUrl + "/revoke";
    private static userInfoUrl: string = AuthClient.baseUrl + "/userinfo";
    private static clientId: string = "Ynio_EuYVk8j2gn_6nUbIVQbj_Aa";

    private restClient: RestClient = new RestClient();

    public performAuth() {
        let authUrl: string = AuthClient.authUrl
            + "?response_type=code"
            + "&client_id=" + AuthClient.clientId
            + "&state=" + Guid.create().toString()
            + "&scope=openid"
            + "&redirect_uri=" + encodeURI(AuthClient.redirectUrl);
        window.open(authUrl, "_self")
    }

    public userInfo<T, R = AxiosResponse<T>>(): Promise<R> {
        return this.restClient.get(AuthClient.userInfoUrl);
    }

    public exchangeCode<T, R = AxiosResponse<T>>(code: string): Promise<R> {
        let data: string = "grant_type=authorization_code"
            + "&code=" + code
            + "&redirect_uri=" + encodeURI(AuthClient.redirectUrl);

        let requestConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        }

        return this.restClient.post(AuthClient.tokenUrl, encodeURI(data), requestConfig);
    }

    public refreshToken<T, R = AxiosResponse<T>>(): Promise<R> {
        let data: string = 'grant_type=refresh_token';

        let requestConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        return this.restClient.post(AuthClient.tokenUrl, encodeURI(data), requestConfig);
    }

    public revokeTokens<T, R = AxiosResponse<T>>(): Promise<R> {
        let access_token_type: string = 'token_type_hint=access_token';
        let refresh_token_type: string = 'token_type_hint=access_token';

        let requestConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        this.restClient.post(AuthClient.revokeUrl, encodeURI(refresh_token_type), requestConfig);
        return this.restClient.post(AuthClient.revokeUrl, encodeURI(access_token_type), requestConfig);
    }
}
