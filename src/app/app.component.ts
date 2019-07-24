import { Component, OnInit } from '@angular/core';
import { routerTransition } from './router-transitions';
import { DateAdapter } from '@angular/material';
import { PermissionsService } from './authentication/permissions.service';
import { Router, NavigationEnd, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    animations: [routerTransition],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    /**
     * An array of granted permissions
     */
    grantedPermissionsObject: object;

    constructor(
        private dateAdapter: DateAdapter<any>,
        private permissionsService: PermissionsService,
        private router: Router,
        private titleService: Title
    ) {}

    ngOnInit() {
        // Set MatDatePicker locale
        this.dateAdapter.setLocale('ru');
        this.resetPermissionsObject();

        // Set document title
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.router)
            )
            .subscribe(event => {
                const title = this.constructTitle(this.router.routerState, this.router.routerState.root)
                    .reverse()
                    .join(' ‹ ');
                this.titleService.setTitle(title);
            });
    }

    /**
     * Construct document title based on route nesting.
     * @param state Current state snapshot.
     * @param parent Parent route.
     */
    constructTitle(state, parent: ActivatedRoute) {
        const data = [];

        if (parent && parent.snapshot.data && parent.snapshot.data.title) data.push(parent.snapshot.data.title);
        if (state && parent) data.push(...this.constructTitle(state, state.firstChild(parent)));

        return data;
    }

    /**
     * Reset permission object
     */
    resetPermissionsObject() {
        this.grantedPermissionsObject = this.permissionsService.get();
    }

    /**
     * Access for reseting permissions objects
     */
    public get resetPermissions() {
        return this.resetPermissionsObject();
    }

    /**
     * Access granted permissions array from outside
     */
    public get grantedPermissions(): object {
        return this.grantedPermissionsObject;
    }

    /**
     * Get route state.
     * @param outlet Router outlet.
     */
    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
