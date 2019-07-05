import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'employee-lock-dialog',
    templateUrl: './lock-dialog.component.html',
    styleUrls: ['./lock-dialog.component.sass']
})
export class LockDialogComponent {
    isRequesting: boolean;

    constructor(
        public dialogRef: MatDialogRef<LockDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
}
