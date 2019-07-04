import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EssentialData {
    id: string;
    photoPath: string;
    fullName: string;
    department: string;
    position: string;
    birthDate: string;
    hireDate: string;
    phone: string;
    email: string;
    factualAddress: string;
    gender: string;
    additionalDescription: string;
}

export interface PassportData {
    scanUrl: string;
    seriesAndNumber: string;
    issuer: string;
    issueDate: string;
    nationality: string;
    birthDate: string;
    registration: string;
}

export interface UserData {}

export interface Log {
    authorName: string;
    createdAt: string;
    lastEdit: string;
}

export interface LockReason {
    id: string;
    name: string;
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
    getEssentialData(id: string): EssentialData {
        return {
            id: id,
            photoPath: 'https://i.pravatar.cc/600',
            fullName: 'Раджабов Алексей Махмадназарович',
            department: 'Управление учета',
            position: 'Старший инспектор',
            birthDate: '15.06.1986',
            hireDate: '22.04.2018',
            phone: '934114400',
            email: 'aleksey@it-2b.pro',
            factualAddress: 'г. Душанбе, ул. Лохути, д. 5, кв. 8',
            gender: 'Мужской',
            additionalDescription:
                'Lorem Ipsum - это текст-«рыба», часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной «рыбой» для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.'
        };
    }

    /**
     * Returns Employee passport data
     * @param id Employee ID
     */
    getPassportData(id: string): PassportData {
        return {
            scanUrl: 'https://www.seller.black/wp-content/uploads/2018/02/2e155157b756.jpg',
            seriesAndNumber: 'А150619',
            issuer: 'ОВД г. р-на Шохмансур, г. Душанбе',
            issueDate: '12.10.2002',
            nationality: 'таджик',
            birthDate: '15.06.1986',
            registration: 'г. Душанбе, ул. Лохути, д. 5, кв. 8'
        };
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

    /**
     * Returns lock reasons with their IDs
     */
    getLockReasons(): Observable<any> {
        return this.http.get<LockReason[]>(environment.API.URL + 'EmployeeLockReason/All');
    }

    lock(employeeId: string, employeeLockReasonId: string) {
        return this.http.post(
            environment.API.URL + 'Employee/LockEmployee',
            JSON.stringify({
                employeeId,
                employeeLockReasonId
            })
        );
    }
}
