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
    constructor(private http: HttpClient) {}

    getDictionaries(): Observable<any> {
        return this.http.get<DictionariesList[]>(environment.API.URL + 'Handbook/All');
    }

    /**
     * Get all Dictionaries subValues
     */
    getDictionariesSubValues(criterias?: FetchDictionariesValuesCriterias, actionName?: string): Observable<any> {
        let ENDPOINT = actionName + '/ALL';
        if (criterias) {
            return this.http.get(
                environment.API.URL +
                    ENDPOINT +
                    '?' +
                    Object.keys(criterias)
                        .reduce(function(a, k) {
                            a.push(k + '=' + encodeURIComponent(criterias[k]));
                            return a;
                        }, [])
                        .join('&')
            );
        } else return this.http.get(environment.API.URL + ENDPOINT);
    }

    getDictionariesForDropdown(actionName?: string): Observable<any> {
        return this.http.get<Department[]>(environment.API.URL + actionName + '/ALL');
    }

    getDictionariesSubValuesById(id?: string, actionName?: string): Observable<any> {
        return this.http.get<DictionariesSubValuesList[]>(environment.API.URL + actionName + '/Get/' + id);
    }

    updateDictionariesSubValues(value: string, actionName: string) {
        return this.http.post(environment.API.URL + actionName + '/Edit', value);
    }

    createDictionariesSubValues(name?: string, isActive?: boolean, actionName?: string, departmentId?: string) {
        return this.http.post(environment.API.URL + actionName + '/Create', { name, isActive, departmentId });
    }
}
