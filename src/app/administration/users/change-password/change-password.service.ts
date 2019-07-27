import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import BaseResponseInterface from 'src/app/common/base-response.interface';

interface ChangePassword {
    smsConfirmationCode: number;
    password: string;
    confirmPassword: string;
}

@Injectable({
    providedIn: 'root'
})
export class ChangePasswordService {
    constructor(private http: HttpClient) {}

    /**
     * Request confirmation code
     */
    requestConfirmationCode(): Observable<BaseResponseInterface<any>> {
        return this.http.post<BaseResponseInterface<any>>(
            environment.API.URL + 'Account/SendChangePasswordConfirmationCodeToCurrentUser',
            {}
        );
    }

    /**
     * Change password
     */
    changePassword(payload: ChangePassword): Observable<BaseResponseInterface<string>> {
        return this.http.post<BaseResponseInterface<string>>(
            environment.API.URL + 'Account/ChangePassword',
            JSON.stringify(payload)
        );
    }
}
