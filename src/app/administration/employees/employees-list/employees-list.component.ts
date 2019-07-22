import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService, Employee, FetchCriterias } from '../employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { AppConfig } from 'src/app/app.config';
import { fade } from 'src/app/animations/all';

@Component({
    selector: 'employees-list',
    templateUrl: './employees-list.component.html',
    styleUrls: ['./employees-list.component.sass'],
    animations: [fade]
})
export class EmployeesListComponent implements OnInit {
    /**
     * Page title.
     */
    title = this.route.snapshot.data['title'];

    /**
     * Determines whether to show locked employees or active.
     */
    showLocked = this.route.snapshot.data['showLocked'];

    /**
     * Employees in the shape of MatTableDataSource.
     */
    employees: MatTableDataSource<Employee[]>;

    /**
     * An array of columns to display in the table.
     */
    displayedColumns: string[];

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Object of criterias collected from paginator and filter
     * to be sent to API.
     */
    fetchCriterias: FetchCriterias;

    /**
     * Number of employees to show on one page.
     */
    pageSize: number;

    /**
     * An array of numbers to show on one page.
     */
    pageSizeOptions = AppConfig.constants.PAGE_SIZE_OPTIONS;

    /**
     * Page number.
     */
    pageIndex: number;

    /**
     * Total number of employees in DB.
     */
    employeesCount: number;

    /**
     * En event that fires when user interacts with MatPaginator.
     * Contains paginator controls' values.
     */
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
        // Get initial fetch criterias from URL query params if user navigated from filtered link
        this.fetchCriterias = this.route.snapshot.queryParams;

        // Set paginator values if user navigated from paginated link
        this.pageIndex = +this.route.snapshot.queryParams.page - 1; // TODO: Configure MatPaginator pageIndex to start from 1
        this.pageSize = +this.route.snapshot.queryParams.pageSize;

        // Fetch data on every URL query params change
        this.route.queryParams.subscribe(params => {
            if (params.constructor === Object && Object.keys(params).length !== 0) this.get(params);
        });

        if (this.showLocked) {
            this.get({ locked: true });

            this.displayedColumns = ['fullName', 'department', 'hireDate', 'lockDate', 'lockReason'];
        } else {
            this.get(this.fetchCriterias);

            this.displayedColumns = ['photo', 'fullName', 'department', 'hasAccount', 'email', 'actions'];
        }
    }

    /**
     * Set query params based on filter form values
     * @param event Object with fetch criterias
     */
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
     * Reset query params that came from filter form
     */
    resetFilter() {
        const params = { ...this.route.snapshot.queryParams };
        delete params.fullName;
        delete params.departmentId;
        delete params.onlyUsers;

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params
        });

        // TODO: fugure out how to fetch on query params change,
        // but not here
        this.get();
    }

    /**
     * Set query params based on sorting values
     * @param event Standard MatSort event
     */
    setSortingQueryParams(event: Sort) {
        if (Object.keys(event).length === 0 && event.constructor === Object) this.resetFilter();
        else {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: { sortProperty: event.active, sortDir: event.direction },
                queryParamsHandling: 'merge'
            });
        }
    }

    /**
     * Set query params based on paginator values
     * @param event Event triggered by changing pagination controls
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

    /**
     * Get employees
     * @param criterias Optional fetch criterias for DB filtering
     */
    get(criterias?: FetchCriterias) {
        this.isRequesting = true;

        if (this.showLocked) criterias = { ...criterias, locked: true };

        this.service.get(criterias).subscribe(
            response => {
                this.employees = response.data.items;
                this.employeesCount = response.data.totalCount;
            },
            (error: Response) => (this.isRequesting = false),
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
