import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export interface Department {
    id: string;
    name: string;
    rootId: string;
}

export interface FetchDepartmentCriterias {
    id?: string;
    name?: string;
    rootId?: string;
    page?: number;
    pageSize?: number;
}

export interface Position {
    id: string;
    name: string;
    createdUserName: string;
}

@Injectable({
    providedIn: 'root'
})
export class DepartmentsAndPositionsService {
    constructor(private http: HttpClient) {}

    /**
     * Get all departments
     */
    getDepartments(criterias?: FetchDepartmentCriterias): Observable<any> {
        let ENDPOINT = 'Department/All';
        if (criterias) {
            return this.http.get(
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
        } else return this.http.get(environment.API.URL + ENDPOINT);
    }
    /**
     * Get all departments for selects
     */
    getDepartmentsListItems(): Observable<any> {
        return this.http.get<Department[]>(environment.API.URL + 'Department/SelectListItem');
    }

    getDepartmentsById(departmentId: string): Observable<any> {
        return this.http.get<Department[]>(environment.API.URL + 'Department/Get/' + departmentId);
    }

    createDepartment(name: string, isActive: boolean) {
        return this.http.post(environment.API.URL + 'Department/Create', { name, isActive });
    }

    updateDepartment(value: string) {
        return this.http.post(environment.API.URL + 'Department/Edit', value);
    }
    /**
     * Get positions by department ID
     * @param departmentId Department ID
     */
    getPositions(departmentId: string): Observable<any> {
        return this.http.get<Position[]>(environment.API.URL + 'Position/AllByDepartmentId/' + departmentId);
    }
}
