import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DepartmentsAndPositionsService, Department } from 'src/app/common-services/departments-and-positions.service';
import { MatSnackBar } from '@angular/material';
import { FetchCriterias } from '../employees.service';
import { ActivatedRoute } from '@angular/router';
import { fade } from 'src/app/animations/all';

export interface FilterData {
    fullName?: string;
    departmentId?: string;
    onlyUsers?: boolean;
}

@Component({
    selector: 'employees-filter',
    templateUrl: './employees-filter.component.html',
    styleUrls: ['./employees-filter.component.sass'],
    animations: [fade]
})
export class EmployeesFilterComponent implements OnInit {
    /**
     * List of departments for selectbox
     */
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
        private snackbar: MatSnackBar,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.getDepartments();

        this.form.patchValue({
            fullName: this.route.snapshot.queryParams.fullName,
            departmentId: this.route.snapshot.queryParams.departmentId,
            onlyUsers: this.route.snapshot.queryParams.onlyUsers
        });
    }

    /**
     * Set up EventEmmiter to pass filter events and data up
     */
    @Output() onFilter = new EventEmitter<FilterData>();
    @Output() onResetFilter = new EventEmitter<boolean>();

    /**
     * Get all departments
     */
    getDepartments() {
        this.departmentsAndPositionsService.getDepartmentsListItems().subscribe(
            response => (this.departments = response.data),
            (error: Response) => {
                switch (error.status) {
                    case 0:
                        this.snackbar.open('Ошибка. Проверьте подключение к Интернету или настройки Firewall.');
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }
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
     * Clear form and Emit empty criterias up
     */
    reset() {
        this.form.reset();
        this.onResetFilter.emit(true);
    }
}
