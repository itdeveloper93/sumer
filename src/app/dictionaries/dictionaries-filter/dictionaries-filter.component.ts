import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FetchCriterias, DictionariesService, Item } from '../dictionaries.service';
import { fade } from 'src/app/animations/all';

export interface FilterData {
    name?: string;
    departmentId?: string;
    onlyActive?: boolean;
}

@Component({
    selector: 'app-dictionaries-filter',
    templateUrl: './dictionaries-filter.component.html',
    styleUrls: ['./dictionaries-filter.component.sass'],
    animations: [fade]
})
export class DictionariesFilterComponent implements OnInit {
    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * List of departments for selectbox
     */
    departments: Item[];

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        name: new FormControl(''),
        onlyActive: new FormControl(true),
        departmentId: new FormControl('')
    });

    /**
     * Set up EventEmmiter to pass filter data up
     */
    @Output() onFilter = new EventEmitter<FilterData>();
    @Output() onResetFilter = new EventEmitter<boolean>();

    /**
     * Controller name (Department | Position | ...)
     */
    @Input() controller: string;

    constructor(
        private snackbar: MatSnackBar,
        private route: ActivatedRoute,
        private dictionariesService: DictionariesService
    ) {}

    ngOnInit() {
        this.form.patchValue({
            name: this.route.snapshot.queryParams.name,
            onlyActive: this.route.snapshot.queryParams.onlyActive
        });

        if (this.controller === 'Position') {
            this.form.get('departmentId').disable();
            this.getDepartments();
            this.form.patchValue({
                departmentId: this.route.snapshot.queryParams.departmentId
            });
        }
    }

    /**
     * Get all departments
     */
    getDepartments() {
        this.isRequesting = true;

        this.dictionariesService.getDictionariesForDropdown('Department').subscribe(
            response => (this.departments = response.data),
            (error: Response) => {
                this.isRequesting = false;
                this.form.get('departmentId').enable();
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

        const name = this.form.get('name');
        const departmentId = this.form.get('departmentId');
        const onlyActive = this.form.get('onlyActive');

        if (name.pristine || name.value == '') delete criterias.name;
        if (departmentId.pristine || departmentId.value == '' || departmentId.value === 'all')
            delete criterias.departmentId;
        if (onlyActive.pristine) delete criterias.onlyActive;

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
