import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export interface DictionariesList {
    name?: string;
    displayName?: string;
}

export interface FetchDictionariesValuesCriterias {
    id?: string;
    name?: string;
    rootId?: string;
    page?: number;
    pageSize?: number;
    isActive?: boolean;
    createdUserName?: string;
    createdAt?: string;
}

export interface DictionariesSubValuesList {
    isActive: boolean;
    createdUserName: string;
    createdAt: string;
    id: string;
    name: string;
}

export interface Department {
    id: string;
    name: string;
    rootId: string;
}

@Injectable({
    providedIn: 'root'
})
export class DictionariesService {
    url = environment.API.URL;
    constructor(private http: HttpClient) {}

    getDictionaries(): Observable<any> {
        return this.http.get<DictionariesList[]>(this.url + 'Handbook/All');
    }

    /**
     * Get all Dictionaries subValues
     */
    getDictionariesSubValues(criterias?: FetchDictionariesValuesCriterias, actionName?: string): Observable<any> {
        let ENDPOINT = actionName + '/ALL';
        if (criterias) {
            return this.http.get(
                this.url +
                    ENDPOINT +
                    '?' +
                    Object.keys(criterias)
                        .reduce(function(a, k) {
                            a.push(k + '=' + encodeURIComponent(criterias[k]));
                            return a;
                        }, [])
                        .join('&')
            );
        } else return this.http.get(this.url + ENDPOINT);
    }

    getDictionariesForDropdown(actionName?: string): Observable<any> {
        return this.http.get<Department[]>(this.url + actionName + '/ALL');
    }

    getDictionariesSubValuesById(id?: string, actionName?: string): Observable<any> {
        return this.http.get<DictionariesSubValuesList[]>(this.url + actionName + '/Get/' + id);
    }

    updateDictionariesSubValues(value: string, actionName: string) {
        return this.http.post(this.url + actionName + '/Edit', value);
    }

    createDictionariesSubValues(name?: string, isActive?: boolean, actionName?: string, departmentId?: string) {
        return this.http.post(this.url + actionName + '/Create', { name, isActive, departmentId });
    }
}
