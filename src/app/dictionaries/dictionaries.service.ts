import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import BaseResponseInterface from '../common/base-response.interface';
import { MatTableDataSource } from '@angular/material';

/**
 * The shape of fetch criterias for DB searching
 */
export interface FetchCriterias {
    id?: string;
    name?: string;
    departmentId?: string;
    isActive?: boolean;
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
    departmentId?: string;
}

export interface Item {
    id?: string;
    name: string;
    rootId?: string;
    isActive: boolean;
    createdUserName?: string;
    createdAt?: string;
    departmentId?: string;
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
        let ENDPOINT = actionName + '/All';

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
     * Get total list of given dictionary items.
     * @param actionName
     */
    getDictionariesForDropdown(actionName?: string): Observable<BaseResponseInterface<Item[]>> {
        return this.http.get<BaseResponseInterface<Item[]>>(this.url + actionName + '/SelectListItem');
    }

    /**
     *
     * @param id
     * @param actionName
     */
    getDictionariesSubValuesById(id?: string, actionName?: string): Observable<BaseResponseInterface<Item>> {
        return this.http.get<BaseResponseInterface<Item>>(this.url + actionName + '/Get/' + id);
    }

    /**
     * Get positions by department ID
     * @param departmentId Department ID
     */
    getPositionsByDepartmentId(departmentId: string): Observable<BaseResponseInterface<Position[]>> {
        return this.http.get<BaseResponseInterface<Position[]>>(
            environment.API.URL + 'Position/AllByDepartmentId/' + departmentId
        );
    }

    /**
     *
     * @param action The type of job to do (Create | Edit)
     * @param controlller Name of dictionary ('Department' | 'Position' | ...)
     * @param payload Form value
     */
    submit(action: string, controlller: string, payload: Item) {
        return this.http.post(this.url + controlller + '/' + action, payload);
    }
}
