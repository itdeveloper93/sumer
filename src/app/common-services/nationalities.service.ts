import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import BaseResponseInterface from '../base-response.interface';

/**
 * Shape of the single nationality
 */
export interface Nationality {
    isActive?: boolean;
    createdAt?: string;
    createdUserName?: string;
    id: string;
    name: string;
}

/**
 * Shape of the response when getting all positions for select box
 */
interface Nationalities {
    items: Nationality[];
    page: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
}

@Injectable({
    providedIn: 'root'
})
export class NationalitiesService {
    constructor(private http: HttpClient) {}

    /**
     * Get all nationalities
     */
    get(): Observable<BaseResponseInterface<Nationalities>> {
        return this.http.get<BaseResponseInterface<Nationalities>>(environment.API.URL + 'Nationality/All');
    }

    /**
     * Get all nationalities for selects
     */
    getListItems(): Observable<BaseResponseInterface<Nationality[]>> {
        return this.http.get<BaseResponseInterface<Nationality[]>>(environment.API.URL + 'Nationality/GetAllListItems');
    }
}
