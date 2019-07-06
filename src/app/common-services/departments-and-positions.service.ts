import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export interface Department {
    id: string;
    name: string;
    rootId: string;
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
    getDepartments(): Observable<any> {
        return this.http.get<Department[]>(environment.API.URL + 'Department/All');
    }

    /**
     * Get positions by department ID
     */
    getPositions(departmentId: string): Observable<any> {
        return this.http.get<Position[]>(
            environment.API.URL + 'Position/AllByDepartmentId/' + departmentId
        );
    }
}
