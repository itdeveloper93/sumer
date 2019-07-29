import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BaseResponseInterface from 'src/app/common/base-response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

/**
 * Shape of user data
 */
export interface User {
    userName: string;
    email: string;
    isLocked: boolean;
    userLockReasonId: string;
    userLockReasonName: string;
    lockDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    /**
     * Get user info
     * @param id User ID
     */
    get(id: string): Observable<BaseResponseInterface<User>> {
        return this.http.get<BaseResponseInterface<User>>(environment.API.URL + 'Account/GetById/' + id);
    }
}
