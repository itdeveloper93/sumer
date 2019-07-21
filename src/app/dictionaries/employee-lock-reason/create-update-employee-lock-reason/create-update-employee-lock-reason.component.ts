import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DictionariesService } from 'src/app/dictionaries/dictionaries.service';

@Component({
    selector: 'app-create-update-employee-lock-reason',
    templateUrl: './create-update-employee-lock-reason.component.html',
    styleUrls: ['./create-update-employee-lock-reason.component.sass']
})
export class CreateUpdateEmployeeLockReasonComponent implements OnInit {
    public heading = true;
    isRequesting: boolean;
    createUpdateEmployeeLockReason = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        isActive: new FormControl(true)
    });
    private id: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CreateUpdateEmployeeLockReasonComponent>,
        private snackbar: MatSnackBar,
        private dictionarieService: DictionariesService
    ) {}

    ngOnInit() {
        if (this.data.id) {
            this.heading = false;
            this.isRequesting = true;
            this.dictionarieService.getDictionariesSubValuesById(this.data.id, 'EmployeeLockReason').subscribe(
                res => {
                    this.createUpdateEmployeeLockReason.patchValue({
                        id: this.data.id,
                        name: this.data.name,
                        isActive: res.data.isActive
                    });
                },
                () => {
                    this.isRequesting = false;
                },

                () => {
                    this.isRequesting = false;
                }
            );
        }
    }

    onSubmit() {
        if (this.createUpdateEmployeeLockReason.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }
        if (this.data.id) {
            this.isRequesting = true;
            this.dictionarieService
                .updateDictionariesSubValues(this.createUpdateEmployeeLockReason.value, 'EmployeeLockReason')
                .subscribe(
                    response => {
                        this.dialogRef.close();
                    },
                    () => {
                        this.isRequesting = false;
                    },

                    () => {
                        this.isRequesting = false;
                    }
                );
        } else {
            this.isRequesting = true;
            const { name, isActive } = this.createUpdateEmployeeLockReason.value;
            this.dictionarieService.createDictionariesSubValues(name, isActive, 'EmployeeLockReason').subscribe(
                response => {
                    this.dialogRef.close();
                },
                () => {
                    this.isRequesting = false;
                },

                () => {
                    this.isRequesting = false;
                }
            );
        }
    }
}
