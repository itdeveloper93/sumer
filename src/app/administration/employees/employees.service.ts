import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

/**
 * The shape of returned Employee
 */
export interface Employee {
    id: string;
    photoPath: string;
    fullName: string;
    department: string;
    position: string;
    userId: boolean;
    phone: string;
    email: string;
    hireDate?: Date;
    lockDate?: Date;
    lockReason?: string;
}

/**
 * The shape of fetch criterias for DB searching
 */
export interface FetchCriterias {
    fullName?: string;
    departmentId?: string;
    hasUser?: boolean;
    page?: number;
    pageSize?: number;
    locked?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {
    /**
     * Determines whether we're in the process of fetching
     * data through HTTP
     */
    isRequesting = false;

    constructor(private http: HttpClient) {}

    get(criterias?: FetchCriterias): Observable<any> {
        return this.http.get(
            environment.API.URL +
                'Employee/All?' +
                Object.keys(criterias)
                    .reduce(function(a, k) {
                        a.push(k + '=' + encodeURIComponent(criterias[k]));
                        return a;
                    }, [])
                    .join('&')
        );
    }
}
