import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { decode } from 'punycode';
import { Observable } from 'rxjs';

/**
 * Shape of the user data from JWT token
 */
export default interface User {
    userId: string;
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
     * Get current signed-in user info from JWT token
     */
    getUser(): User {
        const token = localStorage.getItem('auth_token');
        const jwtHelper = new JwtHelperService();
        const decodedToken = jwtHelper.decodeToken(token);

        const user = {
            name: decodedToken.name,
            photo: decodedToken.photo,
            position: decodedToken.position,
            userId: decodedToken.userId
        };

        return user;
    }
}
