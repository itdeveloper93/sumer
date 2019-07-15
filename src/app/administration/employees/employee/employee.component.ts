import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService, EssentialData, UserData, Log } from './employee.service';
import { Location } from '@angular/common';
import { MatTabChangeEvent, MatSnackBar } from '@angular/material';
import { DashboardLayoutComponent } from 'src/app/layout/dashboard-layout/dashboard-layout.component';
import { SidenavStateService } from 'src/app/layout/dashboard-layout/sidenav-state.service';
import { UpdatePassportDataService, PassportData } from '../update-passport-data/update-passport-data.service';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.sass']
})
export class EmployeeComponent implements OnInit {
    /**
     * Employee ID
     */
    id: string;

    /**
     * Employee data that gets populated to 'Главное' tab
     */
    essentialData: EssentialData;

    /**
     * Passport data that gets populated to 'Паспортные данные' tab
     */
    passportData: PassportData;

    /**
     * User data that gets populated to 'Учетная запись' tab
     */
    userData: UserData;

    /**
     * Log data that gets populated to right side widget
     */
    logData: Log;

    /**
     * Determines whether any fetch operation is in progress
     */
    isRequesting: boolean;

    /**
     * Active tab title. Initially set to 'Главное' to fetch essential
     * data straight away
     */
    activeTabLabel = 'Главное';

    /**
     * Active tab index
     */
    activeTabIndex: number;

    /**
     * Determines if sidebar is opened
     */
    isSidebarOpened: boolean;

    /**
     * Determines if employee has passport data
     */
    hasPassport = false;

    constructor(
        private route: ActivatedRoute,
        private service: EmployeeService,
        public location: Location,
        private snackbar: MatSnackBar,
        private dashboardLayout: DashboardLayoutComponent,
        private sidenavStateService: SidenavStateService,
        private passportDataService: UpdatePassportDataService
    ) {}

    ngOnInit() {
        this.activeTabIndex = +this.route.snapshot.queryParamMap.get('activeTabIndex');
        this.route.paramMap.subscribe(params => (this.id = params.get('id')));

        this.getEssentialData(this.id);

        if (this.activeTabIndex === 1) {
            this.getPassportData(this.id);
            this.activeTabLabel = 'Паспортные данные';
        }

        // Fetch and assign log data
        this.logData = this.getLogData(this.id);

        this.sidenavStateService.onSideNavToggle.subscribe(
            () => (this.isSidebarOpened = this.dashboardLayout.isSidebarOpened)
        );
    }

    /**
     * Get essential data
     * @param id Employee ID
     */
    getEssentialData(id: string) {
        this.isRequesting = true;

        this.service.getEssentialData(id).subscribe(
            response => (this.essentialData = response.data),
            (error: Response) => {
                this.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open('Ошибка. Проверьте подключение к Интернету или настройки Firewall.');
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }

                this.location.back();
            },
            () => (this.isRequesting = false)
        );
    }

    /**
     * Get passport data
     * @param id Employee ID
     */
    getPassportData(id: string) {
        this.isRequesting = true;

        return this.passportDataService.get(id).subscribe(
            response => {
                this.passportData = response.data;

                if (response.data.passportNumber) this.hasPassport = true;
            },
            (error: Response) => {
                this.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open('Ошибка. Проверьте подключение к Интернету или настройки Firewall.');
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }
            },
            () => (this.isRequesting = false)
        );
    }

    /**
     * Get user data
     * @param id Employee ID
     */
    getUserData(id: string): UserData {
        return this.service.getUserData(id);
    }

    /**
     * Get log data
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
    export(id: string, dataType: string) {
        console.log('export()', id, dataType);
    }

    /**
     * Catch MatTabGroup tab change
     * @param event Event object
     */
    catchTabChange(event: MatTabChangeEvent) {
        // Load nessesary data on first tab activation
        switch (event.tab.textLabel) {
            case 'Паспортные данные':
                if (!this.passportData) this.getPassportData(this.id);
                break;

            case 'Учетная запись':
                if (!this.userData) this.userData = this.getUserData(this.id);
                break;
        }

        this.activeTabLabel = event.tab.textLabel;
    }

    /**
     * Unlock employee
     */
    unlock() {
        this.isRequesting = true;
        this.service.unlock(this.id).subscribe(
            response => this.ngOnInit(),
            (error: Response) => {
                this.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open('Ошибка. Проверьте подключение к Интернету или настройки Firewall.');
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }
            },
            () => {
                this.isRequesting = false;
                this.snackbar.open('Сотрудник разблокирован');
            }
        );
    }
}
