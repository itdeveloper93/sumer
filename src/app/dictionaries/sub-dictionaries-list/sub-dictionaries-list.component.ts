import { Component, OnInit, ViewChild } from '@angular/core';
import { FetchCriterias, DictionariesService, Item } from '../dictionaries.service';
import { PageEvent, Sort, MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { CreateUpdateDictionariesComponent } from '../create-update-dictionaries/create-update-dictionaries.component';
import { ActivatedRoute, Router } from '@angular/router';
import { fade } from 'src/app/animations/all';

@Component({
    selector: 'app-sub-dictionaries-list',
    templateUrl: './sub-dictionaries-list.component.html',
    styleUrls: ['./sub-dictionaries-list.component.sass'],
    animations: [fade]
})
export class SubDictionariesListComponent implements OnInit {
    /**
     * Page title.
     */
    title = this.route.snapshot.data['title'];

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
     * Columns to display in the table.
     */
    displayedColumns: string[] = ['name', 'isActive', 'lastEdit', 'author', 'actions'];

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
    dictionarieSubValuesCount: number;

    /**
     * Department ID
     */
    departmentId: string;

    /**
     * Department values
     */
    departments: Item[];

    /**
     * En event that fires when user interacts with MatPaginator.
     * Contains paginator controls' values.
     */
    pageEvent: PageEvent;

    /**
     * Current URL
     */
    currentDictionaryUrl: string;

    /**
     * Name of dictionary ('Department' | 'Position' | ...)
     */
    controller: string;

    /**
     * Department in the shape of MatTableDataSource.
     */
    dictionarieSubValues = new MatTableDataSource();

    /**
     * Export list params.
     */
    exportCriterias: any;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private dictionarieService: DictionariesService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.currentDictionaryUrl = this.route.snapshot.url[0].path;

        // Get initial fetch criterias from URL query params if user navigated from filtered link
        this.fetchCriterias = this.route.snapshot.queryParams;

        // Set paginator values if department navigated from paginated link
        this.pageIndex = +this.route.snapshot.queryParams.page - 1;
        this.pageSize = +this.route.snapshot.queryParams.pageSize;

        switch (this.currentDictionaryUrl) {
            case 'useful-link-categories':
                this.controller = 'UsefulLinkCategory';
                break;

            case 'file-categories':
                this.controller = 'FileCategory';
                break;

            case 'user-lock-reasons':
                this.controller = 'UserLockReason';
                break;

            case 'positions':
                this.controller = 'Position';
                this.displayedColumns.splice(4, 0, 'departmentName');
                break;

            case 'employee-lock-reasons':
                this.controller = 'EmployeeLockReason';
                break;

            case 'nationalities':
                this.controller = 'Nationality';
                break;

            case 'news-categories':
                this.controller = 'NewsCategories';
                break;

            case 'departments':
                this.controller = 'Department';
                break;
        }

        // Fetch data on every URL query params change
        this.route.queryParams.subscribe(params => {
            if (params.constructor === Object && Object.keys(params).length !== 0) {
                this.getDictionarieSubValues(params);
                this.exportCriterias = params;
            } else this.getDictionarieSubValues();
        });

        //this.getDictionarieSubValues();
    }

    /**
     * Create or update department
     * @param id Department ID
     * @param name Department name
     */
    openDialogUpdate(id?: string, name?: string): void {
        const dialogRef = this.dialog.open(CreateUpdateDictionariesComponent, {
            data: { id, name, currentDictionaryUrl: this.route.snapshot.url[0].path }
        });
        if (this.controller === 'Position') {
            this.dictionarieService.getDictionariesForDropdown('Department').subscribe(response => {
                this.departments = response.data;
            });
        }
        dialogRef.afterClosed().subscribe(result => {
            this.getDictionarieSubValues();
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
        delete params.departmentId;
        delete params.onlyActive;

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params
        });

        // TODO: fugure out how to fetch on query params change,
        // but not here
        this.getDictionarieSubValues();
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
    private getDictionarieSubValues(criterias?: FetchCriterias) {
        this.isRequesting = true;

        this.dictionarieService.getDictionariesSubValues(criterias, this.controller).subscribe(
            response => {
                this.dictionarieSubValues = response.data.items;
                this.dictionarieSubValuesCount = response.data.totalCount;
            },
            (error: Response) => (this.isRequesting = false),
            () => {
                this.isRequesting = false;
                this.dictionarieSubValues.paginator = this.paginator;
                this.dictionarieSubValues.sort = this.sort;
            }
        );
    }
}
