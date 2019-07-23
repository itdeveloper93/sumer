import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import BaseResponseInterface from 'src/app/base-response.interface';

/**
 * Shape of passport data to be fetched and sent
 */
export interface PassportData {
    passportScanPath: string;
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
export class UpdatePassportDataService {
    constructor(private http: HttpClient) {}

    /**
     * Get Employee passport data
     * @param id Employee ID
     */
    get(id: string): Observable<BaseResponseInterface<PassportData>> {
        return this.http.get<BaseResponseInterface<PassportData>>(
            environment.API.URL + 'Employee/GetPassportData/' + id
        );
    }

    /**
     * Submit Employee passport data
     * @param id Employee ID
     */
    submit(payload: FormData): Observable<BaseResponseInterface<any>> {
        return this.http.post<BaseResponseInterface<any>>(environment.API.URL + 'Employee/EditPassportData', payload);
    }
}
