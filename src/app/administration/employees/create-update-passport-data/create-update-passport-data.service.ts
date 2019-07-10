import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface PassportData {
    //scanUrl: string;
    passportNumber: string;
    passportIssuer: string;
    passportIssueDate: string;
    nationalityId: string;
    dateOfBirth: string;
    passportAddress: string;
}

@Injectable({
    providedIn: 'root'
})
export class CreateUpdatePassportDataService {
    constructor(private http: HttpClient) {}

    /**
     * Returns Employee passport data
     * @param id Employee ID
     */
    get(id: string): Observable<any> {
        return this.http.get<PassportData[]>(
            environment.API.URL + 'Employee/GetPassportData/' + id
        );
    }

    /**
     * Submits Employee passport data
     * @param id Employee ID
     */
    submit(payload): Observable<any> {
        return this.http.post(environment.API.URL + 'Employee/EditPassportData', payload);
    }
}
