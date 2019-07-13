import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Nationality {
    isActive: boolean;
    createdAt: string;
    createdUserName: string;
    id: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class NationalitiesService {
    constructor(private http: HttpClient) {}

    /**
     * Get all nationalities
     */
    get(): Observable<any> {
        return this.http.get(environment.API.URL + 'Nationality/All');
    }

    /**
     * Get all nationalities for selects
     */
    getListItems(): Observable<any> {
        return this.http.get(environment.API.URL + 'Nationality/GetAllListItems');
    }
}
