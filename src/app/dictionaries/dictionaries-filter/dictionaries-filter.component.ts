import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export interface FilterData {
    name: string;
}

@Component({
  selector: 'app-dictionaries-filter',
  templateUrl: './dictionaries-filter.component.html',
  styleUrls: ['./dictionaries-filter.component.sass']
})
export class DictionariesFilterComponent implements OnInit {
    form = new FormGroup({
        name: new FormControl('')
    });

        // tslint:disable-next-line:no-output-on-prefix
    @Output() onFilter = new EventEmitter<FilterData>();

    filter() {
        this.onFilter.emit(this.form.value);
    }

    reset() {
        this.form.reset({ name: ''});
        this.filter();
    }

    ngOnInit() {
    }
}
