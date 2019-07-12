import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
    DepartmentsAndPositionsService,
    Department
} from 'src/app/common-services/departments-and-positions.service';
import { MatSnackBar } from '@angular/material';
import { FetchCriterias } from '../employees.service';

export interface FilterData {
    fullName?: string;
    departmentId?: string;
    onlyUsers?: boolean;
}

@Component({
    selector: 'employees-filter',
    templateUrl: './employees-filter.component.html',
    styleUrls: ['./employees-filter.component.sass']
})
export class EmployeesFilterComponent implements OnInit {
    isRequesting: boolean;

    departments: Department[];

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        fullName: new FormControl(''),
        departmentId: new FormControl(''),
        onlyUsers: new FormControl(false)
    });

    constructor(
        private departmentsAndPositionsService: DepartmentsAndPositionsService,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getDepartments();
    }

    /**
     * Set up EventEmmiter to pass filter data up
     */
    @Output() onFilter = new EventEmitter<FilterData>();
    @Output() onResetFilter = new EventEmitter<boolean>();

    /**
     * Get all departments
     */
    getDepartments() {
        this.isRequesting = true;
        this.form.get('departmentId').disable();

        this.departmentsAndPositionsService.getDepartments().subscribe(
            response => (this.departments = response.data),
            (error: Response) => {
                this.isRequesting = false;
                this.form.get('departmentId').enable();

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
                this.form.get('departmentId').enable();
            }
        );
    }

    /**
     * Emit filter criterias up
     */
    filter() {
        if (this.form.pristine) {
            this.snackbar.open('Установите параметры фильтрации');

            return false;
        }

        const criterias: FetchCriterias = this.form.value;

        const departmentId = this.form.get('departmentId');
        const fullName = this.form.get('fullName');
        const onlyUsers = this.form.get('onlyUsers');

        if (fullName.pristine || fullName.value == '') delete criterias.fullName;
        if (departmentId.pristine || departmentId.value == '' || departmentId.value === 'all')
            delete criterias.departmentId;
        if (onlyUsers.pristine) delete criterias.onlyUsers;

        this.onFilter.emit(criterias);
    }

    /**
     * Clear form and Emit filter criterias up
     */
    reset() {
        this.form.reset();
        this.onResetFilter.emit(true);
    }
}
