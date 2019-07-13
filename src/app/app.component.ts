import { Component, OnInit } from '@angular/core';
import { routerTransition } from './router-transitions';
import * as moment from 'moment-timezone';
import { DateAdapter } from '@angular/material';

// @ts-ignore
moment.fn.toDateString = function() {
    return this.format('DD.MM.YYYY');
};

/**
 * Parses date from string with given format and Timezone
 * @param date Date as string
 */
export function momentX(date: string) {
    return moment.utc(date, 'DD.MM.YYYY', 'Asia/Dushanbe').utcOffset(300);
}

@Component({
    selector: 'app-root',
    animations: [routerTransition],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    constructor(private dateAdapter: DateAdapter<any>) {}

    ngOnInit() {
        // Set MatDatePicker locale
        this.dateAdapter.setLocale('ru');
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
