import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService, Employee, FetchCriterias } from '../employees.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

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

    constructor(private service: EmployeesService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.isRequesting = this.service.isRequesting;

        if (this.showLocked) {
            this.employees = new MatTableDataSource(this.get({ locked: true }));
            this.displayedColumns = [
                'fullName',
                'departmentAndPosition',
                'hireDate',
                'lockDate',
                'lockReason'
            ];
        } else {
            this.employees = new MatTableDataSource(this.get());
            this.displayedColumns = [
                'photo',
                'fullName',
                'departmentAndPosition',
                'hasAccount',
                'contacts',
                'actions'
            ];
        }

        this.employees.paginator = this.paginator;
        this.employees.sort = this.sort;
    }

    /**
     * Send search criterias to employeesService and get employees
     * list in return
     * @param criterias Fetch criterias for DB searching
     */
    get(criterias?: FetchCriterias) {
        console.log('EmployeesList.get()', this.service.get(criterias));

        return this.service.get(criterias);
    }

    /**
     * Send current viewing employee list to server and start downloading
     * of the returned file
     */
    export() {
        console.log('EmployeesList.export()', this.employees.data);
    }
}
