import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalHttpHeadersInterceptorService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.body instanceof FormData) {
            request = request.clone({
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + localStorage.getItem('auth_token')
                })
            });
        } else {
            request = request.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('auth_token')
                })
            });
        }

        return next.handle(request);
    }
}
