import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CreateUserService {
    constructor(private http: HttpClient) {}

    /**
     * Create user based on employee
     * @param employeeId Employee ID
     */
    createUser(employeeId: string): Observable<any> {
        return this.http.post(
            environment.API.URL + 'Employee/CreateUser',
            JSON.stringify(employeeId)
        );
    }
}
