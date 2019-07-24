import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, PageEvent, MatSnackBar, Sort, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DictionariesService, Item, FetchCriterias } from 'src/app/dictionaries/dictionaries.service';
import { CreateUpdateDepartmentComponent } from './create-update-department/create-update-department.component';
import { fade } from 'src/app/animations/all';

@Component({
    selector: 'app-department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.sass'],
    animations: [fade]
})
export class DepartmentListComponent implements OnInit {
    /**
     * Page title.
     */
    title = this.route.snapshot.data['title'];

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Columns to display in the table.
     */
    displayedColumns: string[] = ['name', 'lastEdit', 'author', 'actions'];

    /**
     * Number of department to show on one page.
     */
    pageSize: number;

    /**
     * An array of numbers to show on one page.
     */
    pageSizeOptions = [20, 50, 100];

    /**
     * Page number.
     */
    pageIndex: number;

    /**
     * Total number of department in DB.
     */
    departmentsCount: number;

    /**
     * En event that fires when user interacts with MatPaginator.
     * Contains paginator controls' values.
     */
    pageEvent: PageEvent;

    /**
     * Department in the shape of MatTableDataSource.
     */
    departments = new MatTableDataSource();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private dictionarieService: DictionariesService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        // Set paginator values if department navigated from paginated link
        this.pageIndex = +this.route.snapshot.queryParams.page - 1;
        this.pageSize = +this.route.snapshot.queryParams.pageSize;

        this.getDepartments();

        // Fetch data on every URL query params change
        this.route.queryParams.subscribe(params => {
            if (params.constructor === Object && Object.keys(params).length !== 0) this.getDepartments(params);
        });
    }

    /**
     * Create or update department
     * @param id Department ID
     * @param name Department name
     */
    openDialogUpdate(id?: string, name?: string): void {
        const dialogRef = this.dialog.open(CreateUpdateDepartmentComponent, {
            data: { id, name }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getDepartments();
            //TODO fetch only if touched
        });
    }

    /**
     * Set filter query params
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
     * Reset filter
     */
    resetFilter() {
        const params = { ...this.route.snapshot.queryParams };
        delete params.name;
        delete params.onlyActive;

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params
        });

        // TODO: fugure out how to fetch on query params change,
        // but not here
        this.getDepartments();
    }

    /**
     * Set sorting query params
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

    /**
     * Send search criterias to departmentService and get departments
     * list in return
     * @param criterias Fetch criterias for DB searching
     */
    private getDepartments(criterias?: FetchCriterias) {
        this.isRequesting = true;

        this.dictionarieService.getDictionariesSubValues(criterias, 'Department').subscribe(
            response => {
                this.departments = response.data.items;
                this.departmentsCount = response.data.totalCount;
            },
            (error: Response) => (this.isRequesting = false),
            () => {
                this.isRequesting = false;
                this.departments.paginator = this.paginator;
                this.departments.sort = this.sort;
            }
        );
    }
}
