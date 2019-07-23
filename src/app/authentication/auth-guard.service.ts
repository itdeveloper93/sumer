import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Route } from '@angular/compiler/src/core';
import { map, tap } from 'rxjs/operators';
import { DashboardLayoutComponent } from '../layout/dashboard-layout/dashboard-layout.component';

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

                    if (response.meta.success) return true;
                    else this.cantActivate(state);
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
