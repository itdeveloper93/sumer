import { Component } from '@angular/core';
import { routerTransition } from './router-transitions';
import * as moment from 'moment-timezone';
moment.locale('ru');

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
export class AppComponent {
    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
