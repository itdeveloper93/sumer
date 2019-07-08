import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    create(payload: Employee): Observable<any> {
        // payload.dateOfBirth = '2019-07-06T09:35:19.858Z';
        // payload.hireDate = '2019-07-06T09:35:19.858Z';
        return this.http.post(environment.API.URL + 'Employee/Create', JSON.stringify(payload));
    }
}
