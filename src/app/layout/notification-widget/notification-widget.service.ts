import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Count {
    count: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationWidgetService {
    constructor() {}

    getNotificationCount() {
        return 1;
    }
}
