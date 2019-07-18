import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { decode } from 'punycode';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';

/**
 * Shape of the user data from JWT token
 */
export default interface User {
    id: string;
    photo: string;
    name: string;
    position: string;
}

@Injectable({
    providedIn: 'root'
})
export class MiniProfileService {
    constructor() {}

    /**
     * Get current signed-in user info from JWT
     */
    getUser(): User {
        const token = AuthService.getToken();
        const jwtHelper = new JwtHelperService();
        const decodedToken = jwtHelper.decodeToken(token);

        const user = {
            name: decodedToken.name,
            photo: decodedToken.photo,
            position: decodedToken.position,
            id: decodedToken.id
        };

        return user;
    }
}
