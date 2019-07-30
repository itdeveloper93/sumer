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
    HttpErrorResponse,
    HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, tap } from 'rxjs/operators';
import { AuthService } from '../../authentication/auth.service';
import { DashboardLayoutComponent } from '../../layout/dashboard-layout/dashboard-layout.component';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class GlobalHttpHeadersInterceptorService implements HttpInterceptor {
    /**
     * Access dashboard layout props
     */
    private dashboardLayout = DashboardLayoutComponent;

    constructor(private authService: AuthService, private snackbar: MatSnackBar) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<
        HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any
    > {
        const authToken = this.authService.getToken() as string;

        if (!(request.body instanceof FormData)) {
            request = request.clone({
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            });
        }

        if (authToken && !this.isRefreshingToken(request.url)) request = this.addAuthToken(request, authToken);

        // Defer progress-bar display to get rid of 'ExpressionChangedAfterItHasBeenCheckedError'
        setTimeout(() => (this.dashboardLayout.isRequesting = true));

        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) this.dashboardLayout.isRequesting = false;
            }),
            catchError((error: HttpErrorResponse) => {
                this.dashboardLayout.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open('Ошибка. Проверьте подключение к Интернету или настройки Firewall.');
                        break;

                    case 401:
                        return this.refreshToken(request, next);
                        break;

                    case 500:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
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
    private addAuthToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    /**
     * Refresh token
     * @param request Request object
     * @param next HTTP next handler
     */
    private refreshToken(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken().pipe(
            flatMap(response => {
                if (response.ok && response.body.meta.success) {
                    this.authService.storeTokens(response.body.data.token, response.body.data.refreshToken);

                    request = this.addAuthToken(request, response.body.data.token);

                    return next.handle(request);
                } else this.authService.signOut();

                return next.handle(request);
            }),
            catchError((error: HttpErrorResponse) => {
                this.authService.signOut();

                return throwError(error);
            })
        );
    }

    private isRefreshingToken(url: string): boolean {
        const matches = url.split('/').lastIndexOf('RefreshToken') > 0 ? true : false;

        return matches;
    }
}
