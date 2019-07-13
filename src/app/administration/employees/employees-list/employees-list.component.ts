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
    ) {}

    ngOnInit() {
        this.fetchCriterias = this.route.snapshot.queryParams;

        this.route.queryParams.subscribe(params => {
            if (params.constructor === Object && Object.keys(params).length !== 0) {
                this.get(params);
            }
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

    setFilterQueryParams(event: FetchCriterias) {
        if (Object.keys(event).length === 0 && event.constructor === Object) this.resetFilter();
        else {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: event
            });
        }
    }

    /**
     * Set selected paginator options as query params
     * @param event Event triggered by changing pagination options
     */
    setPaginationQueryParams(event: PageEvent) {
        const { pageIndex, pageSize } = event;

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                page: pageIndex + 1, // TODO: Configure MatPaginator pageIndex to start from 1
                pageSize
            },
            queryParamsHandling: 'merge'
        });
    }

    resetFilter() {
        const params = { ...this.route.snapshot.queryParams };
        delete params.fullName;
        delete params.departmentId;
        delete params.onlyUsers;

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params
        });

        this.get();
    }

    /**
     * Send search criterias to employeesService and get employees
     * list in return
     * @param criterias Fetch criterias for DB searching
     */
    get(criterias?: FetchCriterias) {
        this.isRequesting = true;

        if (this.showLocked) criterias = { ...criterias, locked: true };

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
