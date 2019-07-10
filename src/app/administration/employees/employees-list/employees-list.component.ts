import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService, Employee, FetchCriterias } from '../employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatSnackBar,
    PageEvent
} from '@angular/material';
import { skip } from 'rxjs/operators';

@Component({
    selector: 'employees-list',
    templateUrl: './employees-list.component.html',
    styleUrls: ['./employees-list.component.sass']
})
export class EmployeesListComponent implements OnInit {
    title = this.route.snapshot.data['title'];
    showLocked = this.route.snapshot.data['showLocked'];

    employees: MatTableDataSource<Employee>;
    isRequesting: boolean;

    fetchCriterias: FetchCriterias;

    displayedColumns: any;
    pageSizeOptions = [20, 50, 100];
    employeesLength: number;
    pageEvent: PageEvent;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private service: EmployeesService,
        private route: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar
    ) {
        // this.router.navigate([], {
        //     relativeTo: this.route,
        //     queryParams: { pageSize: 10 },
        //     queryParamsHandling: 'merge'
        // });
    }

    ngOnInit() {
        this.fetchCriterias = {
            page: this.route.snapshot.queryParams.page
                ? +this.route.snapshot.queryParams.page
                : null,
            pageSize: this.route.snapshot.queryParams.pageSize
                ? +this.route.snapshot.queryParams.pageSize
                : null,
            fillName: this.route.snapshot.queryParams.fillName
                ? this.route.snapshot.queryParams.fillName
                : null,
            departmentId: this.route.snapshot.queryParams.departmentId
                ? this.route.snapshot.queryParams.departmentId
                : null,
            hasUser: this.route.snapshot.queryParams.hasUser
                ? this.route.snapshot.queryParams.hasUser
                : null,
            locked: this.route.snapshot.queryParams.locked
                ? this.route.snapshot.queryParams.locked
                : null
        };

        this.route.paramMap.subscribe(params => {
            console.log(params.get('pageSize'));
        });

        if (this.showLocked) {
            this.get({ locked: true });

            this.displayedColumns = [
                'fullName',
                'departmentAndPosition',
                'hireDate',
                'lockDate',
                'lockReason'
            ];
        } else {
            this.get(this.fetchCriterias);

            this.displayedColumns = [
                'photo',
                'fullName',
                'departmentAndPosition',
                'hasAccount',
                'contacts',
                'actions'
            ];
        }
    }

    // TODO: Clear this shit
    setQueryParams(event: PageEvent) {
        const params = {
            page: null,
            pageSize: null,
            fullName: null,
            departmentId: null,
            hasUser: null,
            locked: null
        };

        if (event.pageSize) {
            if (event.pageIndex === 0) event.pageIndex = 1;

            params.page = event.pageIndex;
            params.pageSize = event.pageSize;
        }

        // Clean null values
        for (var propName in params) {
            if (params[propName] === null || params[propName] === undefined) {
                delete params[propName];
            }
        }

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params
        });

        // TODO: This should run upon queryParamMap subscription,
        // not here
        this.get(params);
    }

    /**
     * Send search criterias to employeesService and get employees
     * list in return
     * @param criterias Fetch criterias for DB searching
     */
    get(criterias?: FetchCriterias) {
        this.isRequesting = true;

        console.log(criterias);

        this.service.get(criterias).subscribe(
            response => {
                this.employees = response.data.items;
                this.employeesLength = response.data.totalCount;
            },
            (error: Response) => {
                this.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open(
                            'Ошибка. Проверьте подключение к Интернету или настройки Firewall.'
                        );
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }
            },
            () => {
                this.isRequesting = false;
                this.employees.paginator = this.paginator;
                this.employees.sort = this.sort;
            }
        );
    }

    /**
     * Send current viewing employee list to server and start downloading
     * of the returned file
     */
    export() {
        console.log('EmployeesList.export()', this.employees.data);
    }
}
