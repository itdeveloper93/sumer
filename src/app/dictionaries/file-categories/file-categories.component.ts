import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatSort, MatPaginator, MatTableDataSource, MatDialog, MatSnackBar, Sort } from '@angular/material';
import { DictionariesService, Item, FetchCriterias } from 'src/app/dictionaries/dictionaries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUpdateFileCategoryComponent } from './create-update-file-category/create-update-file-category.component';
import { fade } from 'src/app/animations/all';

@Component({
    selector: 'app-file-categories',
    templateUrl: './file-categories.component.html',
    styleUrls: ['./file-categories.component.sass'],
    animations: [fade]
})
export class FileCategoryComponent implements OnInit {
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
     * Total number of file-categories in DB.
     */
    fileCategoriesCount: number;

    /**
     * En event that fires when user interacts with MatPaginator.
     * Contains paginator controls' values.
     */
    pageEvent: PageEvent;

    /**
     * employeeLockReason in the shape of MatTableDataSource.
     */
    fileCategories = new MatTableDataSource<Item[]>();

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

        this.getFileCategories();

        // Fetch data on every URL query params change
        this.route.queryParams.subscribe(params => {
            if (params.constructor === Object && Object.keys(params).length !== 0) this.getFileCategories(params);
        });
    }

    /**
     * Create or update department
     * @param id file-categories ID
     * @param name file-categories name
     */
    openDialogUpdate(id?: string, name?: string): void {
        const dialogRef = this.dialog.open(CreateUpdateFileCategoryComponent, {
            data: { id, name }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getFileCategories();
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
        this.getFileCategories();
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
     * Send search criterias to departmentService and get file-categories
     * list in return
     * @param criterias Fetch criterias for DB searching
     */
    private getFileCategories(criterias?: FetchCriterias) {
        this.isRequesting = true;

        this.dictionarieService.getDictionariesSubValues(criterias, 'FileCategory').subscribe(
            response => {
                this.fileCategories = response.data.items;
                this.fileCategoriesCount = response.data.totalCount;
            },
            (error: Response) => (this.isRequesting = false),
            () => {
                this.isRequesting = false;
                this.fileCategories.paginator = this.paginator;
                this.fileCategories.sort = this.sort;
            }
        );
    }
}