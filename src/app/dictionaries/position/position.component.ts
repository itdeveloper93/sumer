import { Component, OnInit, ViewChild } from '@angular/core';
import { DictionariesService, Item, FetchCriterias } from 'src/app/dictionaries/dictionaries.service';
import { PageEvent, Sort, MatSnackBar, MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CreateUpdatePositionComponent } from './create-update-position/create-update-position.component';
import { Router, ActivatedRoute } from '@angular/router';
import { fade } from 'src/app/animations/all';

@Component({
    selector: 'app-position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.sass'],
    animations: [fade]
})
export class PositionComponent implements OnInit {
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
     * Total number of positions in DB.
     */
    positionsCount: number;

    /**
     * En event that fires when user interacts with MatPaginator.
     * Contains paginator controls' values.
     */
    pageEvent: PageEvent;

    /**
     * positions in the shape of MatTableDataSource.
     */
    positions = new MatTableDataSource<Item[]>();

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

        this.getPosition();

        // Fetch data on every URL query params change
        this.route.queryParams.subscribe(params => {
            if (params.constructor === Object && Object.keys(params).length !== 0) this.getPosition(params);
        });
    }

    /**
     * Create or update department
     * @param id positions ID
     * @param name positions name
     */
    openDialogUpdate(id?: string, name?: string): void {
        const dialogRef = this.dialog.open(CreateUpdatePositionComponent, {
            data: { id, name }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getPosition();
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
        this.getPosition();
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
    getPosition(criterias?: FetchCriterias) {
        this.isRequesting = true;

        this.dictionarieService.getDictionariesSubValues(criterias, 'Position').subscribe(
            response => {
                this.positions = response.data.items;
                this.positionsCount = response.data.totalCount;
            },
            (error: Response) => (this.isRequesting = false),
            () => {
                this.isRequesting = false;
                this.positions.paginator = this.paginator;
                this.positions.sort = this.sort;
            }
        );
    }
}
