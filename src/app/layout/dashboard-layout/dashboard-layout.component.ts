import { AuthService } from './../../authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { SidenavStateService } from './sidenav-state.service';

@Component({
    selector: 'app-dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.sass']
})
export class DashboardLayoutComponent implements OnInit {
    isSidebarOpened = true;

    constructor(
        private breakpointObserver: BreakpointObserver,
        public authService: AuthService,
        private sidenavStateService: SidenavStateService
    ) {}

    ngOnInit() {
        this.breakpointObserver.observe(['(max-width: 1367px)']).subscribe((state: BreakpointState) => {
            if (state.matches) this.isSidebarOpened = false;
            else this.isSidebarOpened = true;
        });

        this.sidenavStateService.onSideNavToggle.subscribe(() => {
            this.isSidebarOpened = !this.isSidebarOpened;
        });
    }
}
