import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Route } from '@angular/compiler/src/core';
import { map, tap, catchError } from 'rxjs/operators';
import { DashboardLayoutComponent } from '../layout/dashboard-layout/dashboard-layout.component';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    /**
     * Access dashboard layout props
     */
    dashboardLayout = DashboardLayoutComponent;

    constructor(private authService: AuthService, private router: Router) {}

    /**
     * Guards routes from unauthorized access.
     * @param route Route that user wants to navigate.
     * @param state Router state snapshot.
     */
    canActivate(route: Route, state: RouterStateSnapshot) {
        // If user signed in and token is valid.
        if (this.authService.isSignedIn()) return true;

        // We come here if auth token exists, but expired,
        if (this.authService.getToken()) {
            this.dashboardLayout.isRequesting = true;

            // refresh token.
            return this.authService.refreshToken().pipe(
                map(response => {
                    this.dashboardLayout.isRequesting = false;
                    this.authService.storeTokens(response.body.data.token, response.body.data.refreshToken);

                    if (response.body.meta.success) return true;
                    else this.cantActivate(state);
                }),
                catchError((error: HttpErrorResponse) => {
                    this.cantActivate(state);

                    return throwError(error);
                })
            );
            // Else navigate user to auth page.
        } else this.cantActivate(state);
    }

    /**
     * Redirect user to sign in route.
     * @param state Router sate snapshot.
     */
    cantActivate(state: RouterStateSnapshot) {
        this.router.navigate(['/auth'], {
            queryParams: { returnUrl: state.url ? state.url : '' }
        });

        return false;
    }
}
