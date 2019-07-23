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
        const authToken = this.authService.getToken();

        if (authToken) {
            const payload = this.jwtHelper.decodeToken(authToken);
            let grantedPermissions = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const grantedPermissionsObject = {};

            // If there is only one granted permission, it'll come as single string in token,
            // so we need to convert it into an array.
            if (!Array.isArray(grantedPermissions)) grantedPermissions = JSON.parse(`["${grantedPermissions}"]`);

            if (grantedPermissions) {
                grantedPermissions.forEach((permission: string) => {
                    grantedPermissionsObject[permission] = permission;
                });
            }

            return grantedPermissionsObject;
        }
    }
}
