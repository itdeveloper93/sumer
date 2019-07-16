import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import BaseResponseInterface from 'src/app/base-response.interface';

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
    getLockReasons(entityType: string): Observable<BaseResponseInterface<LockReason[]>> {
        let URL: string;

        switch (entityType) {
            case 'employee':
                URL = environment.API.URL + 'EmployeeLockReason/GetAllListItems';
                break;

            case 'user':
                URL = environment.API.URL + 'UserLockReason/GetAllListItems';
                break;
        }

        if (entityType === 'employee' || entityType === 'user')
            return this.http.get<BaseResponseInterface<LockReason[]>>(URL);
        else return new Observable();
    }

    /**
     * Lock employee / user
     * @param entityType Type of entity (employee | user)
     * @param id Entity ID
     * @param lockReasonId Lock reason ID
     */
    lock(entityType: string, id: string, lockReasonId: string): Observable<BaseResponseInterface<any>> {
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
                URL = environment.API.URL + 'Account/LockUser';

                payload = {
                    id,
                    userLockReasonId: lockReasonId
                };
                break;
        }

        if (entityType === 'employee' || entityType === 'user')
            return this.http.post<BaseResponseInterface<any>>(URL, JSON.stringify(payload));
        else new Observable();
    }

    /**
     * unlock employee / user
     * @param entityType Type of entity (employee | user)
     * @param id Entity ID
     */
    unlock(entityType: string, id: string): Observable<BaseResponseInterface<any>> {
        let URL: string;

        switch (entityType) {
            case 'employee':
                URL = environment.API.URL + 'Employee/UnlockEmployee/' + id;
                break;

            case 'user':
                URL = environment.API.URL + 'Account/UnlockUser/' + id;
                break;
        }

        if (entityType === 'employee' || entityType === 'user')
            return this.http.get<BaseResponseInterface<any>>(URL, {});
        else new Observable();
    }
}
