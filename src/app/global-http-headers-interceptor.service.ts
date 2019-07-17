import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpHeaders,
    HttpErrorResponse,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, finalize, mergeMap, tap } from 'rxjs/operators';
import { AuthService, SignInResponse } from './authentication/auth.service';
import BaseResponseInterface from './base-response.interface';
import { JwtInterceptor, JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class GlobalHttpHeadersInterceptorService implements HttpInterceptor {
    isRefreshing: boolean;

    constructor(private authService: AuthService, private jwtHelper: JwtHelperService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<
        HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any
    > {
        if (!(request.body instanceof FormData)) {
            request = request.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                })
            });
        }

        const authToken = AuthService.getToken() as string;

        console.log(authToken);

        if (authToken) {
            const isExpired = this.jwtHelper.isTokenExpired(authToken);

            console.log(isExpired && !this.isRefreshing);

            if (isExpired && !this.isRefreshing) {
                this.isRefreshing = true;
                this.authService.refreshToken().subscribe(response => {
                    this.isRefreshing = false;
                    console.log(response);

                    this.authService.storeTokens(response.data.token, response.data.refreshToken);

                    return next.handle(this.addTokenToRequest(request, response.data.token));
                });
            }
        }

        return next.handle(this.addTokenToRequest(request, AuthService.getToken()));
    }

    /**
     * Add auth token to given request
     * @param request Request object
     * @param token Auth token
     */
    addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
}
