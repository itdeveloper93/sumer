import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {
    constructor(private jwtHelper: JwtHelperService, private authService: AuthService) {}

    /**
     * Get granted permissions list.
     * @returns An array of granted permissions.
     */
    get() {
        const payload = this.jwtHelper.decodeToken(this.authService.getToken());
        const permissionsArray = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const permissionsObject = {};

        permissionsArray.forEach((permission: string) => {
            permissionsObject[permission] = permission;
        });

        return permissionsObject;
    }
}
