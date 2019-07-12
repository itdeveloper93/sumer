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
     * Create or edit employee
     * @param action A string determining action type (Create || Edit)
     * @param payload Request payload
     */
    submit(action: string, payload: FormData): Observable<any> {
        return this.http.post(environment.API.URL + 'Employee/' + action, payload);
    }
}
