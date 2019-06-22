import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface SignInResponse {
    isSuccess: boolean;
    token: string;
}

interface ResetPasswordResponse {
    isSuccess: boolean;
    token: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isRequesting = false;

    constructor(
        private http: HttpClient,
        public jwtHelper: JwtHelperService,
        private router: Router
    ) {}

    signIn(credentials): Observable<any> {
        this.isRequesting = true;

        return this.http
            .post<SignInResponse>(
                environment.API.URL + 'Account/Login',
                JSON.stringify(credentials)
            )
            .pipe(tap(() => (this.isRequesting = false)))
            .pipe(
                map(response => {
                    if (response.token) {
                        localStorage.setItem('auth_token', response.token);
                        return true;
                    }

                    return false;
                })
            );
    }

    signOut() {
        localStorage.removeItem('auth_token');
        this.router.navigate(['/auth']);
    }

    isSignedIn() {
        const token = localStorage.getItem('auth_token');

        if (!token) return false;

        const isExpired = this.jwtHelper.isTokenExpired(token);

        return !isExpired;
    }

    resetPassword(credentials) {
        this.isRequesting = true;

        return this.http
            .post<ResetPasswordResponse>(
                environment.API.URL + 'Account/ForgotPassword',
                JSON.stringify(credentials)
            )
            .pipe(tap(() => (this.isRequesting = false)))
            .pipe(
                map(response => {
                    if (response.password) return true;
                    return false;
                })
            );
    }
}
