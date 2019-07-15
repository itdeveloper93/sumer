import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
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
interface SignInResponse {
    token: string;
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
        return this.http
            .post<BaseResponseInterface<SignInResponse>>(
                environment.API.URL + 'Account/Login',
                JSON.stringify(credentials),
                {
                    observe: 'response'
                }
            )
            .pipe(
                map(response => {
                    if (response.ok && response.body.meta.success) {
                        localStorage.setItem('auth_token', response.body.data.token);
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
        localStorage.removeItem('auth_token');
        this.router.navigate(['/auth']);
    }

    /**
     * Detemines if user signed-in
     */
    isSignedIn() {
        const token = localStorage.getItem('auth_token');

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
                JSON.stringify(credentials),
                {
                    observe: 'response'
                }
            )
            .pipe(tap(() => (this.isRequesting = false)))
            .pipe(
                map(response => {
                    if (response.ok && response.body.meta.success) return true;
                    return false;
                })
            );
    }
}
