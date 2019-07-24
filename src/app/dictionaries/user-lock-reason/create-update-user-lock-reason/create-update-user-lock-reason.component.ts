import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DictionariesService, Item } from 'src/app/dictionaries/dictionaries.service';

@Component({
    selector: 'app-create-update-user-lock-reason',
    templateUrl: './create-update-user-lock-reason.component.html',
    styleUrls: ['./create-update-user-lock-reason.component.sass']
})
export class CreateUpdateUserLockReasonComponent implements OnInit {
    /**
     * Page heading
     */
    heading = true;

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * User-lock-reason form
     */
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        isActive: new FormControl(true)
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CreateUpdateUserLockReasonComponent>,
        private snackbar: MatSnackBar,
        private dictionarieService: DictionariesService
    ) {}

    ngOnInit() {
        this.getUserLockReasonById();
    }

    /**
     * Get user-lock-raesons by ID
     */
    getUserLockReasonById() {
        if (this.data.id) {
            this.heading = false;
            this.isRequesting = true;

            this.dictionarieService.getDictionariesSubValuesById(this.data.id, 'UserLockReason').subscribe(
                response => {
                    this.form.patchValue({
                        id: this.data.id,
                        name: this.data.name,
                        isActive: response.data.isActive
                    });
                },
                error => (this.isRequesting = false),
                () => (this.isRequesting = false)
            );
        }
    }

    submit() {
        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }

        let payload: Item = {
            name: this.form.get('name').value,
            isActive: this.form.get('isActive').value
        };

        let action = 'Create';

        if (this.data.id) {
            action = 'Edit';
            payload.id = this.data.id;
        }

        this.form.disable();

        this.dictionarieService.submit(action, 'UserLockReason', payload).subscribe(
            response => this.dialogRef.close(),
            error => {
                this.isRequesting = false;
                this.form.enable();
            },
            () => {
                this.isRequesting = false;
                this.form.enable();
            }
        );
    }
}
