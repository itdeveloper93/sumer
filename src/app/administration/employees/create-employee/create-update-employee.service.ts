import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

export interface Employee {
    photo: any;
    lastName: string;
    firstName: string;
    middleName: string;
    dateOfBirth: string;
    genderId: string;
    hireDate: string;
    departmentId: string;
    positionId: string;
    phone: string;
    email: string;
    factualAddress: string;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class CreateUpdateEmployeeService {
    constructor(private http: HttpClient) {}

    /**
     * Create employee
     * @param payload Employee object
     */
    create(payload: FormData): Observable<any> {
        return this.http.post(environment.API.URL + 'Employee/Create', payload);
    }

    /**
     * Edit employee essential info
     * @param id Employee ID
     * @param payload Form value
     */
    edit(payload: FormData): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        return this.http.post(environment.API.URL + 'Employee/Edit', payload, { headers: headers });
    }
}
