import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CreateUpdateEmployeeLockReasonComponent } from '../../employee-lock-reason/create-update-employee-lock-reason/create-update-employee-lock-reason.component';
import { DictionariesService, Item } from 'src/app/dictionaries/dictionaries.service';

@Component({
    selector: 'app-create-update-nationality',
    templateUrl: './create-update-nationality.component.html',
    styleUrls: ['./create-update-nationality.component.sass']
})
export class CreateUpdateNationalityComponent implements OnInit {
    /**
     * Page heading
     */
    title: string;

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * File-categories form
     */
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        isActive: new FormControl(true)
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CreateUpdateEmployeeLockReasonComponent>,
        private snackbar: MatSnackBar,
        private dictionarieService: DictionariesService
    ) {}

    ngOnInit() {
        if (this.data.id) {
            this.form.disable();
            this.title = 'Редактировние записи';
        } else this.title = 'Добавить запись';

        this.getNationalityById();
    }

    /**
     * Get nationalities by ID
     */
    getNationalityById() {
        if (this.data.id) {
            this.isRequesting = true;

            this.dictionarieService.getDictionariesSubValuesById(this.data.id, 'Nationality').subscribe(
                response => {
                    this.form.patchValue({
                        id: this.data.id,
                        name: this.data.name,
                        isActive: response.data.isActive
                    });
                    this.form.enable();
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

        this.dictionarieService.submit(action, 'Nationality', payload).subscribe(
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
