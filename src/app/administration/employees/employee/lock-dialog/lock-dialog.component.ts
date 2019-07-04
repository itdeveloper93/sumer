import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService, LockReason } from '../employee.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'employee-lock-dialog',
    templateUrl: './lock-dialog.component.html',
    styleUrls: ['./lock-dialog.component.sass']
})
export class LockDialogComponent implements OnInit {
    lockReasons: LockReason[];
    employeeId: string;
    isRequesting: boolean;

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        lockReason: new FormControl({ value: '', disabled: true })
    });

    constructor(
        private service: EmployeeService,
        private snackbar: MatSnackBar,
        public dialogRef: MatDialogRef<LockDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.getLockReasons();

        console.log(this.data.employeeId);
    }

    getLockReasons() {
        this.isRequesting = true;

        return this.service.getLockReasons().subscribe(
            response => {
                this.lockReasons = response.data;
                this.form.enable();
            },
            (error: Response) => {
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

                this.dialogRef.close();
                this.isRequesting = false;
            },
            () => (this.isRequesting = false)
        );
    }

    /**
     * Lock employee
     * @param employeeId Employee ID
     * @param employeeLockReasonId Lock reason ID
     */
    lock(employeeId: string, employeeLockReasonId: string) {
        this.service.lock(employeeId, employeeLockReasonId);
    }
}
