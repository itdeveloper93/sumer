import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

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
    get(): Observable<any> {
        return this.http.get<Gender[]>(environment.API.URL + 'Gender/All');
    }
}
