import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { PassportData } from '../update-passport-data/update-passport-data.service';
import BaseResponseInterface from 'src/app/base-response.interface';

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
    lockReasonName: string;
    lockDate: string;
}

/**
 * Shape of user data that gets populated to 'Учетная запись' tab
 */
export interface UserData {}

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
     * Get Employee User data
     * @param id Employee ID
     */
    getUserData(id: string): UserData | null {
        return 'UserData';
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
     * Unlock Employee
     * @param id Employee ID
     */
    unlock(id: string): Observable<any> {
        return this.http.post(environment.API.URL + 'Employee/UnlockEmployee/' + id, {});
    }
}
