import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import BaseResponseInterface from '../base-response.interface';

/**
 * Department shape
 */
export interface Department {
    id: string;
    name: string;
    rootId: string;
}

/**
 * Shape of the response when getting all departments for listing with pagination
 */
interface Departments {
    items: Department[];
    page: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
}

/**
 * Position shape
 */
export interface Position {
    id: string;
    name: string;
    createdUserName: string;
}

/**
 * Shape of the response when getting all positions for listing with pagination
 */
interface Positions {
    items: Position[];
    page: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
}

@Injectable({
    providedIn: 'root'
})
export class DepartmentsAndPositionsService {
    constructor(private http: HttpClient) {}

    /**
     * Get all departments
     */
    getDepartments(): Observable<BaseResponseInterface<Departments>> {
        return this.http.get<BaseResponseInterface<Departments>>(environment.API.URL + 'Department/All');
    }

    /**
     * Get all departments for selects
     */
    getDepartmentsListItems(): Observable<BaseResponseInterface<Department[]>> {
        return this.http.get<BaseResponseInterface<Department[]>>(environment.API.URL + 'Department/SelectListItem');
    }

    /**
     * Get positions by department ID
     * @param departmentId Department ID
     */
    getPositions(departmentId: string): Observable<BaseResponseInterface<Position[]>> {
        return this.http.get<BaseResponseInterface<Position[]>>(
            environment.API.URL + 'Position/AllByDepartmentId/' + departmentId
        );
    }
}
