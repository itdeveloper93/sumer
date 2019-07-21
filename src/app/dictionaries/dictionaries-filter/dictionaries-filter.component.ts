import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FetchDictionariesValuesCriterias } from 'src/app/dictionaries/dictionaries.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

export interface FilterData {
    name?: string;
    onlyActive?: boolean;
}

@Component({
    selector: 'app-dictionaries-filter',
    templateUrl: './dictionaries-filter.component.html',
    styleUrls: ['./dictionaries-filter.component.sass']
})
export class DictionariesFilterComponent implements OnInit {
    isRequesting: boolean;

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        name: new FormControl(''),
        onlyActive: new FormControl(true)
    });

    constructor(private snackbar: MatSnackBar, private route: ActivatedRoute) {}

    ngOnInit() {
        this.form.patchValue({
            name: this.route.snapshot.queryParams.name,
            onlyActive: this.route.snapshot.queryParams.onlyActive
        });
    }

    /**
     * Set up EventEmmiter to pass filter data up
     */
    @Output() onFilter = new EventEmitter<FilterData>();
    @Output() onResetFilter = new EventEmitter<boolean>();

    /**
     * Emit filter criterias up
     */
    filter() {
        if (this.form.pristine) {
            this.snackbar.open('Установите параметры фильтрации');

            return false;
        }

        const criterias: FetchDictionariesValuesCriterias = this.form.value;

        const name = this.form.get('name');
        const onlyActive = this.form.get('onlyActive');

        if (name.pristine || name.value == '') delete criterias.name;
        if (onlyActive.pristine) delete criterias.isActive;

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
