import { Component, OnInit } from '@angular/core';
import { NotificationWidgetService } from './notification-widget.service';

@Component({
    selector: 'notification-widget',
    templateUrl: './notification-widget.component.html',
    styleUrls: ['./notification-widget.component.sass']
})
export class NotificationWidgetComponent implements OnInit {
    notificationCount: number;

    constructor(private notificationWidgetService: NotificationWidgetService) {}

    ngOnInit() {
        this.notificationCount = this.notificationWidgetService.getNotificationCount();
    }
}
