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
    public heading = true;
    departments: Department[];
    isRequesting: boolean;
    createUpdatePosition = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        departmentId: new FormControl(''),
        isActive: new FormControl(true)
    });
    private id: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CreateUpdatePositionComponent>,
        private snackbar: MatSnackBar,
        private dictionarieService: DictionariesService
    ) {}

    ngOnInit() {
        // Fetch nesessary initial data
        this.getDepartments();

        if (this.data.id) {
            this.heading = false;
            this.isRequesting = true;
            this.dictionarieService.getDictionariesSubValuesById(this.data.id, 'Position').subscribe(
                res => {
                    this.createUpdatePosition.patchValue({
                        id: this.data.id,
                        name: this.data.name,
                        departmentId: res.data.departmentId,
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

    getDepartments() {
        this.dictionarieService.getDictionariesForDropdown('Department').subscribe(res => {
            this.departments = res.data.items;
        });
    }
    onSubmit() {
        if (this.createUpdatePosition.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }
        if (this.data.id) {
            this.isRequesting = true;
            this.dictionarieService.updateDictionariesSubValues(this.createUpdatePosition.value, 'Position').subscribe(
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
            const { name, isActive, departmentId } = this.createUpdatePosition.value;
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
