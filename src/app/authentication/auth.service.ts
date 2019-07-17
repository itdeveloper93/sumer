import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import BaseResponseInterface from '../base-response.interface';

/**
 * Sign-in credentials shape
 */
export interface SignInCredentials {
    phoneNumber: number;
    password: string;
}

/**
 * Reset password credentials shape
 */
export interface ResetPasswordCredentials {
    phoneNumber: number;
}

/**
 * Sign-in response shape
 */
export interface SignInResponse {
    token: string;
    refreshToken: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    /**
     * Determines whether any fetch operation is in progress
     */
    isRequesting = false;

    constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) {}

    /**
     * Sign-in
     * @param credentials Sign-in credentials
     */
    signIn(credentials: SignInCredentials): Observable<boolean> {
        console.log(credentials);

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
     * Sign-out
     */
    signOut() {
        AuthService.removeTokens();
        this.router.navigate(['/auth']);
    }

    /**
     * Detemines if user signed-in
     */
    isSignedIn() {
        const token = AuthService.getToken('auth');

        if (!token) return false;

        const isExpired = this.jwtHelper.isTokenExpired(token);

        return !isExpired;
    }

    /**
     * Reset password
     * @param credentials Reset password credentials
     */
    resetPassword(credentials: ResetPasswordCredentials): Observable<boolean> {
        return this.http
            .post<BaseResponseInterface<any>>(
                environment.API.URL + 'Account/ResetPassword',
                JSON.stringify(credentials)
            )
            .pipe(tap(() => (this.isRequesting = false)))
            .pipe(
                map(response => {
                    if (response.meta.success) return true;
                    return false;
                })
            );
    }

    /**
     * Refresh token
     */
    refreshToken(): Observable<BaseResponseInterface<SignInResponse>> {
        return this.http.post<BaseResponseInterface<SignInResponse>>(environment.API.URL + 'Account/RefreshToken', {
            accessToken: AuthService.getToken(),
            refreshToken: AuthService.getToken('refresh')
        });
        // .pipe(
        //     map(response => {
        //         console.log(response);

        //         if (response.data.token) {
        //             this.storeTokens(response.data.token, response.data.refreshToken);
        //         }

        //         return response.data.token;
        //     })
        // );
    }

    /**
     * Get auth or refresh token
     * @param type Type of the token to return (auth || refresh)
     */
    static getToken(type: string = 'auth') {
        return type === 'auth' ? localStorage.getItem('auth_token') : localStorage.getItem('refresh_token');
    }

    /**
     * Remove tokens
     */
    static removeTokens() {
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
