import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DictionariesService } from 'src/app/dictionaries/dictionaries.service';

@Component({
    selector: 'app-create-update-useful-link-category',
    templateUrl: './create-update-useful-link-category.component.html',
    styleUrls: ['./create-update-useful-link-category.component.sass']
})
export class CreateUpdateUsefulLinkCategoryComponent implements OnInit {
    public heading = true;
    isRequesting: boolean;
    createUpdateUsefulLinkCategory = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        isActive: new FormControl(true)
    });
    private id: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CreateUpdateUsefulLinkCategoryComponent>,
        private snackbar: MatSnackBar,
        private dictionarieService: DictionariesService
    ) {}

    ngOnInit() {
        if (this.data.id) {
            this.heading = false;
            this.isRequesting = true;
            this.dictionarieService.getDictionariesSubValuesById(this.data.id, 'UsefulLinkCategory').subscribe(
                res => {
                    this.createUpdateUsefulLinkCategory.patchValue({
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
        if (this.createUpdateUsefulLinkCategory.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }
        if (this.data.id) {
            this.isRequesting = true;
            this.dictionarieService
                .updateDictionariesSubValues(this.createUpdateUsefulLinkCategory.value, 'UsefulLinkCategory')
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
            const { name, isActive } = this.createUpdateUsefulLinkCategory.value;
            this.dictionarieService.createDictionariesSubValues(name, isActive, 'UsefulLinkCategory').subscribe(
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
