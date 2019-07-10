import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { PassportData } from '../create-update-passport-data/create-update-passport-data.service';

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

export interface UserData {}

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
     * Returns Employee essential data
     * @param id Employee ID
     */
    getEssentialData(id: string): Observable<any> {
        return this.http.get<EssentialData[]>(environment.API.URL + 'Employee/Get/' + id);
    }

    /**
     * Returns Employee passport data
     * @param id Employee ID
     */
    getPassportData(id: string): Observable<any> {
        return this.http.get<PassportData[]>(
            environment.API.URL + 'Employee/GetPassportData/' + id
        );
    }

    /**
     * Returns Employee User data
     * @param id Employee ID
     */
    getUserData(id: string): UserData | null {
        return 'UserData';
    }

    /**
     * Returns Employee and User log data
     * @param id Employee ID
     */
    getLog(id: string): Log {
        return {
            authorName: 'Мирзоев К. О.',
            createdAt: '22.06.2019',
            lastEdit: '5.07.2019, 12:32'
        };
    }

    unlock(id: string): Observable<any> {
        return this.http.post(environment.API.URL + 'Employee/UnlockEmployee/' + id, {});
    }
}
