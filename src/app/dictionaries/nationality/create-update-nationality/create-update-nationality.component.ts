import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CreateUpdateEmployeeLockReasonComponent } from '../../employee-lock-reason/create-update-employee-lock-reason/create-update-employee-lock-reason.component';
import { DictionariesService } from 'src/app/common-services/dictionaries.service';

@Component({
    selector: 'app-create-update-nationality',
    templateUrl: './create-update-nationality.component.html',
    styleUrls: ['./create-update-nationality.component.sass']
})
export class CreateUpdateNationalityComponent implements OnInit {
    public heading = true;
    isRequesting: boolean;
    createUpdateNationality = new FormGroup({
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
            this.dictionarieService.getDictionariesSubValuesById(this.data.id, 'Nationality').subscribe(
                res => {
                    this.createUpdateNationality.patchValue({
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
        if (this.createUpdateNationality.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }
        if (this.data.id) {
            this.isRequesting = true;
            this.dictionarieService
                .updateDictionariesSubValues(this.createUpdateNationality.value, 'Nationality')
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
            const { name, isActive } = this.createUpdateNationality.value;
            this.dictionarieService.createDictionariesSubValues(name, isActive, 'Nationality').subscribe(
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
