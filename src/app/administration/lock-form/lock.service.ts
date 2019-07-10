import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export interface LockReason {
    id: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class LockService {
    constructor(private http: HttpClient) {}

    /**
     * Returns lock reasons with their IDs
     * @param entityType Type of entities for fetching respective lock reasons (employee | user)
     */
    getLockReasons(entityType: string): Observable<any> {
        let URL: string;

        switch (entityType) {
            case 'employee':
                URL = environment.API.URL + 'EmployeeLockReason/All';
                break;

            case 'user':
                URL = environment.API.URL + 'UserLockReason/All';
                break;
        }

        if (entityType === 'employee' || entityType === 'user')
            return this.http.get<LockReason[]>(URL);
        else return new Observable();
    }

    /**
     * Lock user
     * @param entityType Type of entities for fetching respective lock reasons (employee | user)
     * @param id User ID
     * @param lockReasonId Lock reason ID
     */
    lock(entityType: string, id: string, lockReasonId: string): Observable<any> {
        let URL: string;
        let payload: object;

        switch (entityType) {
            case 'employee':
                URL = environment.API.URL + 'Employee/LockEmployee';

                payload = {
                    employeeId: id,
                    employeeLockReasonId: lockReasonId
                };
                break;

            case 'user':
                URL = environment.API.URL + 'Account/LockAccount';

                payload = {
                    userId: id,
                    userLockReasonId: lockReasonId
                };
                break;
        }

        if (entityType === 'employee' || entityType === 'user')
            return this.http.post(URL, JSON.stringify(payload));
        else new Observable();
    }
}
