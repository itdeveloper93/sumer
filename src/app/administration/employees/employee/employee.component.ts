import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService, EssentialData, Log } from './employee.service';
import { Location } from '@angular/common';
import { MatTabChangeEvent, MatSnackBar } from '@angular/material';
import { DashboardLayoutComponent } from 'src/app/layout/dashboard-layout/dashboard-layout.component';
import { SidenavStateService } from 'src/app/layout/dashboard-layout/sidenav-state.service';
import { UpdatePassportDataService, PassportData } from '../update-passport-data/update-passport-data.service';
import { fade } from 'src/app/animations/all';
import { UserService, User } from '../../users/user/user.service';
import { downloadFileFromBlob } from 'src/app/common/utils';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.sass'],
    animations: [fade]
})
export class EmployeeComponent implements OnInit {
    /**
     * Determines, whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Employee ID.
     */
    id: string;

    /**
     * Employee data that gets populated to 'Главное' tab.
     */
    essentialData: EssentialData;

    /**
     * Passport data that gets populated to 'Паспортные данные' tab.
     */
    passportData: PassportData;

    /**
     * User data that gets populated to 'Учетная запись' tab.
     */
    userData: User;

    /**
     * Log data that gets populated to right side widget.
     */
    logData: Log;

    /**
     * Active tab title. Initially set to 'Главное' to fetch essential
     * data straight away.
     */
    activeTabLabel = 'Главное';

    /**
     * Active tab index.
     */
    activeTabIndex: number;

    /**
     * Determines if sidebar is opened.
     */
    isSidebarOpened: boolean;

    /**
     * Determines if employee has passport data.
     */
    hasPassport = false;

    /**
     * Determines whether lock form is loaded.
     */
    lockFormLoaded: boolean;

    constructor(
        private route: ActivatedRoute,
        private service: EmployeeService,
        public location: Location,
        private snackbar: MatSnackBar,
        private dashboardLayout: DashboardLayoutComponent,
        private sidenavStateService: SidenavStateService,
        private passportDataService: UpdatePassportDataService,
        private userService: UserService
    ) {}

    ngOnInit() {
        console.log(1);

        this.activeTabIndex = +this.route.snapshot.queryParamMap.get('activeTabIndex');
        this.route.paramMap.subscribe(params => (this.id = params.get('id')));

        switch (this.activeTabIndex) {
            case 1:
                this.getPassportData(this.id);
                this.activeTabLabel = 'Паспортные данные';
                break;

            case 2:
                this.getUserData(this.id);
                this.activeTabLabel = 'Учетная запись';
                break;

            default:
                this.getEssentialData(this.id);
                this.activeTabLabel = 'Главное';
                break;
        }

        // Fetch and assign log data
        this.logData = this.getLogData(this.id);

        this.sidenavStateService.onSideNavToggle.subscribe(
            () => (this.isSidebarOpened = this.dashboardLayout.isSidebarOpened)
        );
    }

    /**
     * Get essential data.
     * @param id Employee ID
     */
    getEssentialData(id: string) {
        this.service
            .getEssentialData(id)
            .subscribe(response => (this.essentialData = response.data), (error: Response) => this.location.back());
    }

    /**
     * Get passport data.
     * @param id Employee ID
     */
    getPassportData(id: string) {
        return this.passportDataService.get(id).subscribe(response => {
            this.passportData = response.data;

            if (response.data.passportNumber) this.hasPassport = true;
        });
    }

    /**
     * Get user data.
     * @param id Employee ID
     */
    getUserData(id: string) {
        this.userService.get(id).subscribe(response => (this.userData = response.data));
    }

    /**
     * Get log data.
     * @param id Employee ID
     */
    getLogData(id: string): Log {
        return this.service.getLog(id);
    }

    /**
     * Export given data to file (PDF)
     * @param id Employee ID
     * @param dataType The type of data to export ('essential' | 'passport')
     */
    export() {
        this.isRequesting = true;

        this.service
            .export(this.id)
            .subscribe(
                response => downloadFileFromBlob(response.headers.get('content-disposition'), response.body),
                (error: Response) => (this.isRequesting = false),
                () => (this.isRequesting = false)
            );
    }

    /**
     * Catch MatTabGroup tab change
     * @param event Event object
     */
    catchTabChange(event: MatTabChangeEvent) {
        switch (event.tab.textLabel) {
            case 'Главное':
                this.getEssentialData(this.id);
                break;

            case 'Паспортные данные':
                this.getPassportData(this.id);
                break;

            case 'Учетная запись':
                this.getUserData(this.id);
                break;
        }

        this.activeTabLabel = event.tab.textLabel;
    }
}
