import { Injectable } from '@angular/core';
import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpHeaders,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { AuthService } from './authentication/auth.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalHttpHeadersInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<
        HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any
    > {
        const authToken = this.authService.getToken() as string;

        if (!(request.body instanceof FormData)) {
            request = request.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                })
            });
        }

        if (authToken) request = this.addAuthToken(request, authToken);

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 401:
                        return this.authService.refreshToken().pipe(
                            flatMap(response => {
                                if (response.meta.success) {
                                    this.authService.storeTokens(response.data.token, response.data.refreshToken);

                                    request = this.addAuthToken(request, response.data.token);

                                    return next.handle(request);
                                } else this.authService.signOut();

                                return next.handle(request);
                            })
                        );
                }

                return throwError(error);
            })
        );
    }

    /**
     * Add auth token to given request
     * @param request Request object
     * @param token Auth token
     */
    addAuthToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    refreshToken() {}
}
