import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService, EssentialData, PassportData, UserData, Log } from './employee.service';
import { Location } from '@angular/common';
import { MatTabChangeEvent, MatDialog, MatDialogRef } from '@angular/material';
import { LockDialogComponent } from './lock-dialog/lock-dialog.component';

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

    constructor(
        private route: ActivatedRoute,
        private service: EmployeeService,
        public location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => (this.id = params.get('id')));

        // Fetch and assign essential data
        this.essentialData = this.getEssentialData(this.id);

        // Fetch and assign log data
        this.logData = this.getLogData(this.id);
    }

    /**
     * Get essential data
     * @param id Employee ID
     */
    getEssentialData(id: string): EssentialData {
        return this.service.getEssentialData(id);
    }

    /**
     * Get passport data
     * @param id Employee ID
     */
    getPassportData(id: string): PassportData {
        return this.service.getPassportData(id);
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
                if (!this.passportData) this.passportData = this.getPassportData(this.id);
                break;

            case 'Учетная запись':
                if (!this.userData) this.userData = this.getUserData(this.id);
                break;
        }

        this.activeTabLabel = event.tab.textLabel;
    }

    openLockDialog() {
        this.lockDialog = this.dialog.open(LockDialogComponent, {
            data: {
                id: this.id
            }
        });
    }
}
