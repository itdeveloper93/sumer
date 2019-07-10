import { Component } from '@angular/core';
import { SidenavStateService } from '../dashboard-layout/sidenav-state.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
    constructor(private sidenavState: SidenavStateService) {}

    toggleSidebar() {
        this.sidenavState.onSideNavToggle.emit();
    }
}
