import { Component, OnInit, ViewChild } from '@angular/core';
import {
    Department,
    DepartmentsAndPositionsService,
    FetchDepartmentCriterias
} from '../../common-services/departments-and-positions.service';
import { MatDialog, MatPaginator, MatTableDataSource, PageEvent, MatSnackBar } from '@angular/material';
import { CreateUpdateDepartmentComponent } from '../create-update-department/create-update-department.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.sass']
})
export class DepartmentListComponent implements OnInit {
    title = this.route.snapshot.data['title'];
    isRequesting: boolean;
    displayedColumns: string[] = ['name', 'lastEdit', 'author', 'actions'];

    pageSize: number;
    pageSizeOptions = [20, 50, 100];
    pageIndex: number;
    departmentsCount: number;
    pageEvent: PageEvent;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    department = new MatTableDataSource<Department[]>();
    private id: any;

    constructor(
        private departmentService: DepartmentsAndPositionsService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar
    ) {}

    openDialogUpdate(id?: string, name?: string): void {
        const dialogRef = this.dialog.open(CreateUpdateDepartmentComponent, {
            data: { id, name }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.departmentService.getDepartments().subscribe(response => {
                this.department = response.data.items;
                this.id = response.data.items.id;
            });
        });
    }
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
    getDepartments(criterias?: FetchDepartmentCriterias) {
        this.isRequesting = true;

        this.departmentService.getDepartments(criterias).subscribe(
            response => {
                this.department = response.data.items;
                this.id = response.data.items.id;
                this.departmentsCount = response.data.totalCount;
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
                this.department.paginator = this.paginator;
            }
        );
    }
}
