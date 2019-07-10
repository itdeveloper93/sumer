import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService, Employee, FetchCriterias } from '../employees.service';
import { ActivatedRoute } from '@angular/router';
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

    displayedColumns: any;
    pageSizeOptions = [20, 50, 100];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private service: EmployeesService,
        private route: ActivatedRoute,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit() {
        this.isRequesting = true;

        if (this.showLocked) {
            //this.employees = new MatTableDataSource(this.get({ locked: true }));
            this.get({ locked: true });
            this.displayedColumns = [
                'fullName',
                'departmentAndPosition',
                'hireDate',
                'lockDate',
                'lockReason'
            ];
        } else {
            //this.employees = new MatTableDataSource(this.get());
            this.get();
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
        this.service.get(criterias).subscribe(
            response => {
                this.employees = response.data;
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
