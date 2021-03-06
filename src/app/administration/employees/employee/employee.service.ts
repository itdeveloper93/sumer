import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { PassportData } from '../update-passport-data/update-passport-data.service';
import BaseResponseInterface from 'src/app/common/base-response.interface';
import { objectToQueryString } from 'src/app/common/utils';

/**
 * Shape of essential employee data that gets populated
 * to 'Главное' tab
 */
export interface EssentialData {
    id: string;
    photoPath: string;
    fullName: string;
    department: string;
    departmentId: string;
    position: string;
    positionId: string;
    dateOfBirth: string;
    hireDate: string;
    phone: string;
    email: string;
    factualAddress: string;
    genderName: string;
    description: string;
    userId: string;
    isLocked: boolean;
    employeeLockReasonName: string;
    lockDate: string;
}

/**
 * Shape of log data that gets populated to widget
 */
export interface Log {
    authorName: string;
    createdAt: string;
    lastEdit: string;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient) {}

    /**
     * Get Employee essential data
     * @param id Employee ID
     */
    getEssentialData(id: string): Observable<BaseResponseInterface<EssentialData>> {
        return this.http.get<BaseResponseInterface<EssentialData>>(environment.API.URL + 'Employee/Get/' + id);
    }

    /**
     * Get Employee passport data
     * @param id Employee ID
     */
    getPassportData(id: string): Observable<BaseResponseInterface<PassportData>> {
        return this.http.get<BaseResponseInterface<PassportData>>(
            environment.API.URL + 'Employee/GetPassportData/' + id
        );
    }

    /**
     * Get Employee and User log data
     * @param id Employee ID
     */
    getLog(id: string): Log {
        return {
            authorName: 'Мирзоев К. О.',
            createdAt: '22.06.2019',
            lastEdit: '5.07.2019, 12:32'
        };
    }

    /**
     * Export employee as file.
     * @param id Employee ID.
     */
    export(id: string) {
        return this.http.get(environment.API.URL + 'Employee/DownloadEmployeeCard/' + id, {
            responseType: 'blob',
            observe: 'response'
        });
    }
}
