import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LockService, LockReason } from './lock.service';
import { MatSnackBar } from '@angular/material';
import { EmployeeService, EssentialData } from '../employees/employee/employee.service';
import { fade } from '../../animations/all';
import { UserService } from '../users/user/user.service';
import { DashboardLayoutComponent } from 'src/app/layout/dashboard-layout/dashboard-layout.component';
import { Subscription, Observable } from 'rxjs';
import BaseResponseInterface from 'src/app/common/base-response.interface';

@Component({
    selector: 'lock-form',
    templateUrl: './lock-form.component.html',
    styleUrls: ['./lock-form.component.sass'],
    animations: [fade]
})
export class LockFormComponent implements OnInit {
    /**
     * Type of the entity to do job on (employee || user)
     */
    @Input() entityType: string;

    /**
     * Entity ID
     */
    @Input() id: string;

    /**
     * Form layout
     */
    @Input() horisontal: boolean;

    /**
     * Access dashboard layout props and methods
     */
    dashboardLayout = DashboardLayoutComponent;

    /**
     * Determines whether any fetch operation is in progress
     */
    isRequesting: boolean;

    /**
     * List of lock reasons for selectbox
     */
    lockReasons: LockReason[];

    /**
     * Determmines whether entity is locked
     */
    entityLockStatus: {
        isLocked: boolean;
        lockReasonName: string;
        lockDate: string;
    };

    /**
     * Event which fires when lock form has loaded
     */
    @Output() onLoad = new EventEmitter<boolean>();

    /**
     * Event which fires if lock form has errors
     */
    @Output() onError = new EventEmitter<boolean>();

    /**
     * Event which fires if lock form has no errors
     */
    @Output() onSuccess = new EventEmitter<boolean>();

    /**
     * Event which fires if lock was toggled.
     */
    @Output() locked = new EventEmitter<boolean>();

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        lockReason: new FormControl({ value: '', disabled: true })
    });

    constructor(
        private service: LockService,
        private snackbar: MatSnackBar,
        private employeeService: EmployeeService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.getLockReasons();
        this.getEntityLockStatus();
    }

    /**
     * Get lock reasons
     */
    getLockReasons() {
        this.isRequesting = true;

        return this.service.getLockReasons(this.entityType).subscribe(
            response => {
                this.lockReasons = response.data;
                this.form.enable();
            },
            (error: Response) => {
                this.onError.emit(true);
                this.isRequesting = false;
                this.form.enable();
            },
            () => (this.isRequesting = false)
        );
    }

    /**
     * Get entity lock status
     */
    getEntityLockStatus() {
        this.isRequesting = true;

        let get: Observable<BaseResponseInterface<any>>;

        switch (this.entityType) {
            case 'employee':
                get = this.employeeService.getEssentialData(this.id);
                break;

            case 'user':
                get = this.userService.get(this.id);
                break;
        }

        get.subscribe(
            response => {
                this.entityLockStatus = {
                    isLocked: response.data.isLocked,
                    lockReasonName:
                        this.entityType === 'employee'
                            ? response.data.employeeLockReasonName
                            : response.data.userLockReasonName,
                    lockDate: response.data.lockDate
                };

                this.onLoad.emit(true);
            },
            (error: Response) => (this.isRequesting = false),
            () => (this.isRequesting = false)
        );
    }

    /**
     * Lock entity
     * @param lockReasonId Lock reason ID
     */
    lock(lockReasonId: string) {
        if (!this.form.get('lockReason').value) {
            this.snackbar.open('Вы не выбрали причину блокировки');

            return false;
        }

        this.isRequesting = true;
        this.service.lock(this.entityType, this.id, lockReasonId).subscribe(
            response => {
                this.ngOnInit();
                this.onSuccess.emit(true);
                this.locked.emit(true);
            },
            (error: Response) => {
                this.onSuccess.emit(false);
                this.isRequesting = false;
            },
            () => {
                this.isRequesting = false;

                if (this.entityType === 'employee') this.snackbar.open('Сотрудник заблокирован');
                else this.snackbar.open('Пользователь заблокирован');
            }
        );
    }

    /**
     * Unlock entity
     */
    unlock() {
        this.isRequesting = true;

        this.service.unlock(this.entityType, this.id).subscribe(
            response => {
                this.ngOnInit();
                this.onSuccess.emit(true);
                this.locked.emit(false);
            },
            (error: Response) => {
                this.onSuccess.emit(false);
                this.isRequesting = false;
            },
            () => {
                this.isRequesting = false;

                if (this.entityType === 'employee') this.snackbar.open('Сотрудник разблокирован');
                else this.snackbar.open('Пользователь разблокирован');
            }
        );
    }
}
