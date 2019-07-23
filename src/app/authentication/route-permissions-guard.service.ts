import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PermissionsService } from './permissions.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class RoutePermissionsGuard {
    constructor(
        private authService: AuthService,
        private permissionsService: PermissionsService,
        private snackbar: MatSnackBar
    ) {}

    /**
     * Checks if user has permission to access given route.
     * @param route Route the user wants to enter.
     */
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const requiredPermissions: string[] = route.data.permissions;
        const grantedPermissions: string[] = Object.keys(this.permissionsService.get());

        const permissionsMatched: boolean = requiredPermissions.some((requiredPermission: string) =>
            grantedPermissions.includes(requiredPermission)
        );

        if (this.authService.isSignedIn() && permissionsMatched) return true;
        else return false;
    }
}
