import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DictionariesService, Department, Item } from 'src/app/dictionaries/dictionaries.service';

@Component({
    selector: 'app-create-update-position',
    templateUrl: './create-update-position.component.html',
    styleUrls: ['./create-update-position.component.sass']
})
export class CreateUpdatePositionComponent implements OnInit {
    /**
     * Page heading
     */
    heading = true;

    /**
     * Hold departments values
     */
    departments: Department[];

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Positions form
     */
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        departmentId: new FormControl(''),
        isActive: new FormControl(true)
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CreateUpdatePositionComponent>,
        private snackbar: MatSnackBar,
        private dictionarieService: DictionariesService
    ) {}

    ngOnInit() {
        this.form.disable();
        // Fetch nesessary initial data
        this.getDepartments();

        this.getPositionsById();
    }

    /**
     * Get position by ID
     */
    getPositionsById() {
        if (this.data.id) {
            this.heading = false;
            this.isRequesting = true;

            this.dictionarieService.getDictionariesSubValuesById(this.data.id, 'Position').subscribe(
                response => {
                    this.form.patchValue({
                        id: this.data.id,
                        name: this.data.name,
                        departmentId: response.data.departmentId,
                        isActive: response.data.isActive
                    });
                    this.form.enable();
                },
                error => (this.isRequesting = false),
                () => (this.isRequesting = false)
            );
        }
    }

    /**
     * Get all department
     */
    getDepartments() {
        this.dictionarieService.getDictionariesForDropdown('Department').subscribe(response => {
            this.departments = response.data.items;
        });
    }

    submit() {
        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }

        let payload: Item = {
            name: this.form.get('name').value,
            isActive: this.form.get('isActive').value,
            departmentId: this.form.get('departmentId').value
        };

        let action = 'Create';

        if (this.data.id) {
            action = 'Edit';
            payload.id = this.data.id;
        }

        this.form.disable();

        this.dictionarieService.submit(action, 'Position', payload).subscribe(
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
