import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import BaseResponseInterface from 'src/app/common/base-response.interface';
import { MatTableDataSource } from '@angular/material';
import { objectToQueryString } from 'src/app/common/utils';

/**
 * The shape of fetched Employee
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

interface Employees<T> {
    items: T;
    page: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
}

/**
 * The shape of fetch criterias for DB searching
 */
export interface FetchCriterias {
    fullName?: string;
    departmentId?: string;
    onlyUsers?: boolean;
    page?: number;
    pageSize?: number;
    locked?: boolean;
}

/**
 * The shape of export criterias
 */
export interface ExportCriterias {
    fullName?: string;
    departmentId?: string;
    onlyUsers?: boolean;
    sortProperty?: any;
    sortDir?: string;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {
    constructor(private http: HttpClient) {}

    /**
     * Get employees list.
     * @param criterias Fetch criterias
     */
    get(criterias?: FetchCriterias): Observable<BaseResponseInterface<Employees<MatTableDataSource<Employee[]>>>> {
        let ENDPOINT = 'Employee/All';

        if (criterias) {
            if (criterias.locked) ENDPOINT = 'Employee/AllLockedEmployees';

            return this.http.get<BaseResponseInterface<Employees<MatTableDataSource<Employee[]>>>>(
                environment.API.URL + ENDPOINT + '?' + objectToQueryString(criterias)
            );
        } else
            return this.http.get<BaseResponseInterface<Employees<MatTableDataSource<Employee[]>>>>(
                environment.API.URL + ENDPOINT
            );
    }

    /**
     * Export employees list.
     * @param criterias Export criterias.
     */
    export(criterias: ExportCriterias) {
        let ENDPOINT = environment.API.URL + 'Employee/ExportExcel';

        if (criterias) ENDPOINT += '?' + objectToQueryString(criterias);

        return this.http.get(ENDPOINT, {
            responseType: 'blob',
            observe: 'response'
        });
    }
}
