import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DictionariesService, Item } from '../dictionaries.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-update-dictionaries',
    templateUrl: './create-update-dictionaries.component.html',
    styleUrls: ['./create-update-dictionaries.component.sass']
})
export class CreateUpdateDictionariesComponent implements OnInit {
    /**
     * Page heading
     */
    title: string;

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Name of dictionary ('Department' | 'Position' | ...)
     */
    controller: string;

    /**
     * Department ID
     */
    departmentId: string;

    /**
     * Form values for request
     */
    payload: Item;

    /**
     * Departments values
     */
    departments: Item[];

    /**
     * Department form
     */
    form = new FormGroup({
        name: new FormControl('', Validators.required),
        isActive: new FormControl(true),
        departmentId: new FormControl('')
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CreateUpdateDictionariesComponent>,
        private snackbar: MatSnackBar,
        private dictionariesService: DictionariesService
    ) {}

    ngOnInit() {
        if (this.data.id) {
            this.form.disable();
            this.title = 'Редактировние записи';
        } else this.title = 'Добавить запись';

        switch (this.data.currentDictionaryUrl) {
            case 'useful-link-categories':
                this.controller = 'UsefulLinkCategory';
                break;

            case 'file-categories':
                this.controller = 'FileCategory';
                break;

            case 'user-lock-reasons':
                this.controller = 'UserLockReason';
                break;

            case 'positions':
                this.controller = 'Position';
                this.dictionariesService.getDictionariesForDropdown('Department').subscribe(response => {
                    this.departments = response.data;
                });
                break;

            case 'employee-lock-reasons':
                this.controller = 'EmployeeLockReason';
                break;

            case 'nationalities':
                this.controller = 'Nationality';
                break;

            case 'news-categories':
                this.controller = 'NewsCategories';
                break;

            case 'departments':
                this.controller = 'Department';
                break;
        }

        if (this.data.id) this.getDictionariesSubValuesById();
    }

    /**
     * Get SubDictionary by ID
     */
    getDictionariesSubValuesById(controller = this.controller) {
        this.isRequesting = true;

        this.dictionariesService.getDictionariesSubValuesById(this.data.id, controller).subscribe(
            response => {
                this.form.patchValue({
                    name: this.data.name,
                    isActive: response.data.isActive
                });

                if (this.controller == 'Position') {
                    this.form.patchValue({
                        departmentId: response.data.departmentId
                    });

                    this.departmentId = response.data.departmentId;
                }
                this.form.enable();
            },
            error => (this.isRequesting = false),
            () => (this.isRequesting = false)
        );
    }

    submit() {
        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }

        this.payload = {
            name: this.form.get('name').value,
            isActive: this.form.get('isActive').value
        };

        if (this.controller == 'Position') this.payload['departmentId'] = this.form.get('departmentId').value;

        let action = 'Create';

        if (this.data.id) {
            action = 'Edit';
            this.payload.id = this.data.id;
        }

        this.form.disable();

        this.dictionariesService.submit(action, this.controller, this.payload).subscribe(
            response => {
                if (this.form.get('name').value !== '') this.dialogRef.close('submit');
            },
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
