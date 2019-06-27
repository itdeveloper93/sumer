import { Component, OnInit } from '@angular/core';
import { DashboardLayoutComponent } from '../dashboard-layout/dashboard-layout.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    constructor(public dashboardLayout: DashboardLayoutComponent) {}

    ngOnInit() {}

    toggleSidebar() {
        this.dashboardLayout.isSidebarOpened = !this.dashboardLayout
            .isSidebarOpened;
    }
}
