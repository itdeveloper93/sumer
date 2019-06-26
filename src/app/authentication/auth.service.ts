import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import SignInResponseInterface, {
    SignInCredentials
} from './sign-in/sign-in.interface';
import ResetPasswordResponseInterface, {
    ResetPasswordCredentials
} from './reset-password/reset-password.interface';

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

    signIn(credentials: SignInCredentials): Observable<any> {
        return this.http
            .post<SignInResponseInterface>(
                environment.API.URL + 'Account/Login',
                JSON.stringify(credentials),
                {
                    observe: 'response'
                }
            )
            .pipe(
                map(response => {
                    if (response.ok && response.body.meta.success) {
                        localStorage.setItem(
                            'auth_token',
                            response.body.data.token
                        );
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

    resetPassword(credentials: ResetPasswordCredentials): Observable<boolean> {
        return this.http
            .post<ResetPasswordResponseInterface>(
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
