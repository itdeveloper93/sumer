import { Component, OnInit } from '@angular/core';
import { routerTransition } from './router-transitions';
import { DateAdapter } from '@angular/material';
import { PermissionsService } from './authentication/permissions.service';

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

    constructor(private dateAdapter: DateAdapter<any>, private permissionsService: PermissionsService) {}

    ngOnInit() {
        // Set MatDatePicker locale
        this.dateAdapter.setLocale('ru');
        this.resetPermissionsObject();
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

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
