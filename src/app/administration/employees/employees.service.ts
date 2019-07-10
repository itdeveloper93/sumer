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
    name?: string;
    department?: string;
    hasAccount?: boolean;
    locked?: boolean;
    offset?: number;
    count?: number;
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
        return this.http.get(environment.API.URL + 'Employee/All');
    }
}
