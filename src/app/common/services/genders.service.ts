import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import BaseResponseInterface from '../base-response.interface';

/**
 * Shape of the single gender
 */
export interface Gender {
    id: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class GendersService {
    constructor(private http: HttpClient) {}

    /**
     * Get all genders
     */
    get(): Observable<BaseResponseInterface<Gender[]>> {
        return this.http.get<BaseResponseInterface<Gender[]>>(environment.API.URL + 'Gender/All');
    }
}
