import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, tap, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import BaseResponseInterface from '../common/base-response.interface';

/**
 * Sign-in credentials shape.
 */
export interface SignInCredentials {
    phoneNumber: number;
    password: string;
    rememberMe: boolean;
}

/**
 * Reset password credentials shape.
 */
export interface ResetPasswordCredentials {
    phoneNumber: string;
}

/**
 * Sign-in response shape.
 */
export interface SignInResponse {
    token: string;
    refreshToken: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) {}

    /**
     * Sign-in
     * @param credentials Sign-in credentials.
     * @returns true | false – on success | error – respectively.
     */
    signIn(credentials: SignInCredentials): Observable<boolean> {
        return this.http
            .post<BaseResponseInterface<SignInResponse>>(
                environment.API.URL + 'Account/Login',
                JSON.stringify(credentials)
            )
            .pipe(
                map(response => {
                    if (response.meta.success) {
                        this.storeTokens(response.data.token, response.data.refreshToken);

                        return true;
                    }

                    return false;
                })
            );
    }

    /**
     * Sign-out.
     */
    signOut() {
        this.removeTokens();
        this.router.navigate(['/auth']);
    }

    /**
     * Detemines if user signed-in and auth token is valid
     * @returns true if user signed in and token is valid, false if token
     * is expired.
     */
    isSignedIn() {
        const token = this.getToken('auth');

        if (!token) return false;

        const isExpired = this.jwtHelper.isTokenExpired(token);

        return !isExpired;
    }

    /**
     * Reset password.
     * @param credentials Reset password credentials.
     * @returns true | false – on success | error – respectively.
     */
    resetPassword(credentials: ResetPasswordCredentials): Observable<boolean> {
        return this.http
            .post<BaseResponseInterface<any>>(
                environment.API.URL + 'Account/ResetPassword',
                JSON.stringify(credentials)
            )
            .pipe(
                map(response => {
                    if (response.meta.success) return true;

                    return false;
                })
            );
    }

    /**
     * Refresh JWT.
     * @returns New tokens.
     */
    refreshToken(): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(
            environment.API.URL + 'Account/RefreshToken',
            {
                accessToken: this.getToken(),
                refreshToken: this.getToken('refresh')
            },
            { observe: 'response' }
        );
    }

    /**
     * Get auth or refresh token.
     * @param type Type of the token to return (auth || refresh).
     * @returns Auth or refresh token string.
     */
    getToken(type = 'auth'): string {
        return type === 'auth' ? localStorage.getItem('auth_token') : localStorage.getItem('refresh_token');
    }

    /**
     * Remove tokens
     */
    removeTokens() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
    }

    /**
     * Save tokens to localStorage
     * @param auth Auth token
     * @param refresh Refresh token
     */
    storeTokens(auth: string, refresh: string) {
        localStorage.setItem('auth_token', auth);
        localStorage.setItem('refresh_token', refresh);
    }
}
