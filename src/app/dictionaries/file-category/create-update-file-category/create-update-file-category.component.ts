import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DictionariesService } from 'src/app/common-services/dictionaries.service';

@Component({
    selector: 'app-create-update-file-category',
    templateUrl: './create-update-file-category.component.html',
    styleUrls: ['./create-update-file-category.component.sass']
})
export class CreateUpdateFileCategoryComponent implements OnInit {
    public heading = true;
    isRequesting: boolean;
    createUpdateFileCategory = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        isActive: new FormControl(true)
    });
    private id: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CreateUpdateFileCategoryComponent>,
        private snackbar: MatSnackBar,
        private dictionarieService: DictionariesService
    ) {}

    ngOnInit() {
        if (this.data.id) {
            this.heading = false;
            this.isRequesting = true;
            this.dictionarieService.getDictionariesSubValuesById(this.data.id, 'FileCategory').subscribe(
                res => {
                    this.createUpdateFileCategory.patchValue({
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
        if (this.createUpdateFileCategory.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }
        if (this.data.id) {
            this.isRequesting = true;
            this.dictionarieService
                .updateDictionariesSubValues(this.createUpdateFileCategory.value, 'FileCategory')
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
            const { name, isActive } = this.createUpdateFileCategory.value;
            this.dictionarieService.createDictionariesSubValues(name, isActive, 'FileCategory').subscribe(
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
