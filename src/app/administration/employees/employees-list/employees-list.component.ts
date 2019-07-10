import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService, Employee, FetchCriterias } from '../employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

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

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private service: EmployeesService,
        private route: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit() {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                pageSize: 50
            },
            queryParamsHandling: 'merge',
            // preserve the existing query params in the route
            skipLocationChange: true
            // do not trigger navigation
        });

        this.route.paramMap.subscribe(params => {
            this.fetchCriterias = {
                fillName: params.get('fillName'),
                departmentId: params.get('departmentId'),
                hasUser: params.get('hasUser') == 'true' ? true : false,
                locked: params.get('locked') == 'true' ? true : false,
                page: +params.get('page'),
                pageSize: +params.get('pageSize')
            };
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
