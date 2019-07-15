import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Route } from '@angular/compiler/src/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    /**
     * Guards routes from unauthorized access
     * @param route Route that user wants to navigate
     * @param state Router state snapshot
     */
    canActivate(route: Route, state: RouterStateSnapshot) {
        if (this.authService.isSignedIn()) return true;

        this.router.navigate(['/auth'], {
            queryParams: { returnUrl: state.url }
        });

        return false;
    }
}
