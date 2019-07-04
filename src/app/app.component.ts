import { Component, OnInit } from '@angular/core';
import { routerTransition } from './router-transitions';

@Component({
    selector: 'app-root',
    animations: [routerTransition],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
