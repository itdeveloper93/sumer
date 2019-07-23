import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import BaseResponseInterface from 'src/app/base-response.interface';

/**
 * Fetched Employee shape for editing
 */
export interface Employee {
    id: string;
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
     * Create or edit employee
     * @param action A string determining action type (Create || Edit)
     * @param payload Request payload
     */
    submit(action: string, payload: FormData): Observable<BaseResponseInterface<Employee>> {
        return this.http.post<BaseResponseInterface<Employee>>(environment.API.URL + 'Employee/' + action, payload);
    }
}
