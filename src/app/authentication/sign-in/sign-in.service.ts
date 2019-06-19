import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SignInService {
    private _API_URL = 'https://192.168.88.243:45456/api/';
    private _API_ENDPOINT = 'Account/Login';

    private _headers = new HttpHeaders().set(
        'Content-Type',
        'application/json'
    );

    constructor(private http: HttpClient) {}

    signIn(credentials) {
        return this.http
            .post(
                this._API_URL + this._API_ENDPOINT,
                JSON.stringify(credentials),
                {
                    headers: new HttpHeaders().set(
                        'Content-Type',
                        'application/json'
                    )
                }
            )
            .pipe(
                map(response => {
                    console.log(response.json());
                })
            );
    }

    signOut() {}

    isLoggedIn() {}
}
