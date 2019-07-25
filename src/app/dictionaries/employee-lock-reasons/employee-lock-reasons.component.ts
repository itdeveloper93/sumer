import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, PageEvent, MatTableDataSource, MatDialog, MatSnackBar, Sort } from '@angular/material';
import { DictionariesService, Item, FetchCriterias } from 'src/app/dictionaries/dictionaries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUpdateEmployeeLockReasonComponent } from './create-update-employee-lock-reason/create-update-employee-lock-reason.component';
import { fade } from 'src/app/animations/all';
import { CreateUpdateDictionariesComponent } from '../create-update-dictionaries/create-update-dictionaries.component';

@Component({
    selector: 'app-employee-lock-reasons',
    templateUrl: './employee-lock-reasons.component.html',
    styleUrls: ['./employee-lock-reasons.component.sass'],
    animations: [fade]
})
export class EmployeeLockReasonComponent implements OnInit {
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
     * Total number of employee-lock-reasons in DB.
     */
    employeeLockReasonsCount: number;

    /**
     * En event that fires when user interacts with MatPaginator.
     * Contains paginator controls' values.
     */
    pageEvent: PageEvent;

    /**
     * employee-lock-reason in the shape of MatTableDataSource.
     */
    employeeLockReasons = new MatTableDataSource<Item[]>();

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

        this.getEmployeeLockReasons();

        // Fetch data on every URL query params change
        this.route.queryParams.subscribe(params => {
            if (params.constructor === Object && Object.keys(params).length !== 0) this.getEmployeeLockReasons(params);
        });
    }

    /**
     * Create or update department
     * @param id employee-lock-reasons ID
     * @param name employee-lock-reasons name
     */
    openDialogUpdate(id?: string, name?: string): void {
        const dialogRef = this.dialog.open(CreateUpdateDictionariesComponent, {
            data: { id, name, currentDictionaryUrl: this.route.snapshot.url[0].path }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getEmployeeLockReasons();
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
        this.getEmployeeLockReasons();
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
     * Send search criterias to departmentService and get employee-lock-reasons
     * list in return
     * @param criterias Fetch criterias for DB searching
     */
    private getEmployeeLockReasons(criterias?: FetchCriterias) {
        this.isRequesting = true;

        this.dictionarieService.getDictionariesSubValues(criterias, 'EmployeeLockReason').subscribe(
            response => {
                this.employeeLockReasons = response.data.items;
                this.employeeLockReasonsCount = response.data.totalCount;
            },
            (error: Response) => (this.isRequesting = false),
            () => {
                this.isRequesting = false;
                this.employeeLockReasons.paginator = this.paginator;
                this.employeeLockReasons.sort = this.sort;
            }
        );
    }
}
