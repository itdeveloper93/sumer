import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import BaseResponseInterface from 'src/app/base-response.interface';
import { MatTableDataSource } from '@angular/material';

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

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {
    constructor(private http: HttpClient) {}

    /**
     * Get employee list.
     *
     * Gets fetch criterias object, converts them into query string and
     * appends to API URL
     * @param criterias Fetch criterias
     */
    get(criterias?: FetchCriterias): Observable<BaseResponseInterface<Employees<MatTableDataSource<Employee[]>>>> {
        let ENDPOINT = 'Employee/All';

        if (criterias) {
            if (criterias.locked) ENDPOINT = 'Employee/AllLockedEmployees';

            return this.http.get<BaseResponseInterface<Employees<MatTableDataSource<Employee[]>>>>(
                environment.API.URL +
                    ENDPOINT +
                    '?' +
                    Object.keys(criterias)
                        .reduce(function(a, k) {
                            a.push(k + '=' + encodeURIComponent(criterias[k]));
                            return a;
                        }, [])
                        .join('&')
            );
        } else
            return this.http.get<BaseResponseInterface<Employees<MatTableDataSource<Employee[]>>>>(
                environment.API.URL + ENDPOINT
            );
    }
}
