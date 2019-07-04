import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export interface FilterData {
    name: string;
    department: string;
    hasAccount: boolean;
}

@Component({
    selector: 'employees-filter',
    templateUrl: './employees-filter.component.html',
    styleUrls: ['./employees-filter.component.sass']
})
export class EmployeesFilterComponent {
    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        name: new FormControl(''),
        department: new FormControl(''),
        hasAccount: new FormControl(false)
    });

    /**
     * Set up EventEmmiter to pass filter data up
     */
    @Output() onFilter = new EventEmitter<FilterData>();

    /**
     * Emit filter criterias up
     */
    filter() {
        this.onFilter.emit(this.form.value);
    }

    /**
     * Clear form and Emit filter criterias up
     */
    reset() {
        this.form.reset({ name: '', department: '', hasAccount: false });
        this.filter();
    }
}
