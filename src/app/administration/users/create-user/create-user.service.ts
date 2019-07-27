import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import BaseResponseInterface from 'src/app/common/base-response.interface';

interface User {
    userName: string;
    email: string;
    phone: string;
    isLocked: boolean;
    userLockReasonId: string;
    userLockReasonName: string;
    lockDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class CreateUserService {
    constructor(private http: HttpClient) {}

    /**
     * Create user based on employee
     * @param employeeId Employee ID
     */
    createUser(employeeId: string): Observable<BaseResponseInterface<User>> {
        return this.http.post<BaseResponseInterface<User>>(
            environment.API.URL + 'Employee/CreateUser',
            JSON.stringify(employeeId)
        );
    }
}
