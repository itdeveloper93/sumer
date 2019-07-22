import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import BaseResponseInterface from '../base-response.interface';
import { MatTableDataSource } from '@angular/material';

/**
 * The shape of fetch criterias for DB searching
 */
export interface FetchCriterias {
    isActive?: boolean;
    name?: string;
    id?: string;
    onlyActive?: boolean;
    page?: number;
    pageSize?: number;
}

export interface DictionariesList {
    name?: string;
    displayName?: string;
}

interface Items<T> {
    items: T;
    page: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
}

export interface Item {
    id: string;
    name: string;
    rootId: string;
    isActive: boolean;
    createdUserName: string;
    createdAt: string;
    departmentId?: string;
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
    getDictionariesSubValues(
        criterias?: FetchCriterias,
        actionName?: string
    ): Observable<BaseResponseInterface<Items<MatTableDataSource<Item[]>>>> {
        let ENDPOINT = actionName + '/ALL';
        if (criterias) {
            return this.http.get<BaseResponseInterface<Items<MatTableDataSource<Item[]>>>>(
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
        } else return this.http.get<BaseResponseInterface<Items<MatTableDataSource<Item[]>>>>(this.url + ENDPOINT);
    }

    /**
     *
     * @param actionName
     */
    getDictionariesForDropdown(actionName?: string): Observable<BaseResponseInterface<Items<Department[]>>> {
        return this.http.get<BaseResponseInterface<Items<Department[]>>>(this.url + actionName + '/All');
    }

    getDictionariesSubValuesById(id?: string, actionName?: string): Observable<BaseResponseInterface<Item>> {
        return this.http.get<BaseResponseInterface<Item>>(this.url + actionName + '/Get/' + id);
    }

    updateDictionariesSubValues(value: string, actionName: string) {
        return this.http.post(this.url + actionName + '/Edit', value);
    }

    createDictionariesSubValues(name?: string, isActive?: boolean, actionName?: string, departmentId?: string) {
        return this.http.post(this.url + actionName + '/Create', { name, isActive, departmentId });
    }
}
