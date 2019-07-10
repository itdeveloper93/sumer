import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, EssentialData, UserData, Log } from './employee.service';
import { Location } from '@angular/common';
import { MatTabChangeEvent, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { LockDialogComponent } from './lock-dialog/lock-dialog.component';
import { DashboardLayoutComponent } from 'src/app/layout/dashboard-layout/dashboard-layout.component';
import { SidenavStateService } from 'src/app/layout/dashboard-layout/sidenav-state.service';
import {
    CreateUpdatePassportDataService,
    PassportData
} from '../create-update-passport-data/create-update-passport-data.service';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.sass']
})
export class EmployeeComponent implements OnInit {
    id: string;
    essentialData: EssentialData;
    passportData: PassportData;
    userData: UserData;
    logData: Log;
    isRequesting: boolean;
    activeTabLabel = 'Главное';
    lockDialog: MatDialogRef<LockDialogComponent>;
    isSidenavOpened: boolean;
    selectedTabIndex: number;

    hasPassport = false;

    constructor(
        private route: ActivatedRoute,
        private service: EmployeeService,
        public location: Location,
        public dialog: MatDialog,
        private snackbar: MatSnackBar,
        private dashboardLayout: DashboardLayoutComponent,
        private sidenavStateService: SidenavStateService,
        private passportDataService: CreateUpdatePassportDataService
    ) {}

    ngOnInit() {
        this.selectedTabIndex = +this.route.snapshot.queryParamMap.get('selectedTabIndex');
        this.route.paramMap.subscribe(params => (this.id = params.get('id')));

        // this.route.paramMap.subscribe(params => {
        //     this.id = params.get('id');
        // });

        this.getEssentialData(this.id);
        if (this.selectedTabIndex === 1) this.getPassportData(this.id);

        // Fetch and assign log data
        this.logData = this.getLogData(this.id);

        this.sidenavStateService.onSideNavToggle.subscribe(
            () => (this.isSidenavOpened = this.dashboardLayout.isSidebarOpened)
        );
    }

    /**
     * Get essential data
     * @param id Employee ID
     */
    getEssentialData(id: string) {
        this.isRequesting = true;

        this.service.getEssentialData(id).subscribe(
            response => {
                this.essentialData = response.data;
            },
            (error: Response) => {
                this.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open(
                            'Ошибка. Проверьте подключение к Интернету или настройки Firewall.'
                        );
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
                        this.snackbar.open(
                            'Ошибка. Проверьте подключение к Интернету или настройки Firewall.'
                        );
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
     * Opens lock employee popup
     */
    openLockDialog() {
        this.lockDialog = this.dialog.open(LockDialogComponent, {
            data: { id: this.id }
        });
    }

    unlock() {
        this.isRequesting = true;
        this.service.unlock(this.id).subscribe(
            response => this.ngOnInit(),
            (error: Response) => {
                this.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open(
                            'Ошибка. Проверьте подключение к Интернету или настройки Firewall.'
                        );
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
