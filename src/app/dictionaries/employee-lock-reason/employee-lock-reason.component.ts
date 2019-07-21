import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, PageEvent, MatTableDataSource, MatDialog, MatSnackBar, Sort } from '@angular/material';
import {
    DictionariesService,
    DictionariesSubValuesList,
    FetchDictionariesValuesCriterias
} from 'src/app/dictionaries/dictionaries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUpdateEmployeeLockReasonComponent } from './create-update-employee-lock-reason/create-update-employee-lock-reason.component';

@Component({
    selector: 'app-employee-lock-reason',
    templateUrl: './employee-lock-reason.component.html',
    styleUrls: ['./employee-lock-reason.component.sass']
})
export class EmployeeLockReasonComponent implements OnInit {
    title = this.route.snapshot.data['title'];
    isRequesting: boolean;
    displayedColumns: string[] = ['name', 'lastEdit', 'author', 'actions'];

    pageSize: number;
    pageSizeOptions = [20, 50, 100];
    pageIndex: number;
    employeeLockReasonsCount: number;
    pageEvent: PageEvent;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    employeeLockReason = new MatTableDataSource<DictionariesSubValuesList[]>();
    private id: any;

    constructor(
        private dictionarieService: DictionariesService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar
    ) {}

    openDialogUpdate(id?: string, name?: string): void {
        const dialogRef = this.dialog.open(CreateUpdateEmployeeLockReasonComponent, {
            data: { id, name }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getEmployeeLockReason();
        });
    }
    ngOnInit() {
        // Set paginator values if department navigated from paginated link
        this.pageIndex = +this.route.snapshot.queryParams.page - 1;
        this.pageSize = +this.route.snapshot.queryParams.pageSize;

        this.getEmployeeLockReason();

        // Fetch data on every URL query params change
        this.route.queryParams.subscribe(params => {
            if (params.constructor === Object && Object.keys(params).length !== 0) this.getEmployeeLockReason(params);
        });
    }

    /**
     * Set filter query params
     * @param event Object with fetch criterias
     */
    setFilterQueryParams(event: FetchDictionariesValuesCriterias) {
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
        this.getEmployeeLockReason();
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
    getEmployeeLockReason(criterias?: FetchDictionariesValuesCriterias) {
        this.isRequesting = true;

        this.dictionarieService.getDictionariesSubValues(criterias, 'EmployeeLockReason').subscribe(
            response => {
                this.employeeLockReason = response.data.items;

                this.id = response.data.items.id;
                this.employeeLockReasonsCount = response.data.totalCount;
            },
            (error: Response) => {
                this.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open('Ошибка. Проверьте подключение к Интернету или настройки Firewall.');
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }
            },
            () => {
                this.isRequesting = false;
                this.employeeLockReason.paginator = this.paginator;
                this.employeeLockReason.sort = this.sort;
            }
        );
    }
}