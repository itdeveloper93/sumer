import { Component, OnInit } from '@angular/core';
import { routerTransition } from './router-transitions';
import { DateAdapter } from '@angular/material';

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
