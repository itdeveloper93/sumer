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
    /**
     * Page heading
     */
    heading = true;

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Usful-link-categories form
     */
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        isActive: new FormControl(true)
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CreateUpdateUsefulLinkCategoryComponent>,
        private snackbar: MatSnackBar,
        private dictionarieService: DictionariesService
    ) {}

    ngOnInit() {
        this.getUsefulLinkCategoryById();
    }

    /**
     * Get usful-link-categories by ID
     */
    getUsefulLinkCategoryById() {
        if (this.data.id) {
            this.heading = false;
            this.isRequesting = true;
            this.dictionarieService.getDictionariesSubValuesById(this.data.id, 'UsefulLinkCategory').subscribe(
                response => {
                    this.form.patchValue({
                        id: this.data.id,
                        name: this.data.name,
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

    onSubmit() {
        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }
        if (this.data.id) {
            this.isRequesting = true;
            this.dictionarieService.updateDictionariesSubValues(this.form.value, 'UsefulLinkCategory').subscribe(
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
            const { name, isActive } = this.form.value;
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
