import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DictionariesService, Department } from 'src/app/dictionaries/dictionaries.service';

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

    /**
     * Get all department
     */
    getDepartments() {
        this.dictionarieService.getDictionariesForDropdown('Department').subscribe(response => {
            this.departments = response.data.items;
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }
        if (this.data.id) {
            this.isRequesting = true;
            this.dictionarieService.updateDictionariesSubValues(this.form.value, 'Position').subscribe(
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
            const { name, isActive, departmentId } = this.form.value;
            this.dictionarieService.createDictionariesSubValues(name, isActive, departmentId, 'Position').subscribe(
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
