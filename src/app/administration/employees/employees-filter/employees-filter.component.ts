import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FetchCriterias } from '../employees.service';
import { ActivatedRoute } from '@angular/router';
import { fade } from 'src/app/animations/all';
import { DictionariesService, Item } from 'src/app/dictionaries/dictionaries.service';

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
    departments: Item[];

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        fullName: new FormControl(''),
        departmentId: new FormControl(''),
        onlyUsers: new FormControl(false)
    });

    constructor(
        private dictionariesService: DictionariesService,
        private snackbar: MatSnackBar,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params.constructor === Object && Object.keys(params).length === 0) this.reset();
        });

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
        this.dictionariesService
            .getDictionariesForDropdown('Department')
            .subscribe(response => (this.departments = response.data));
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
