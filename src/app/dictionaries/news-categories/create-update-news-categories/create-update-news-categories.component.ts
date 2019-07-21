import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DictionariesService } from 'src/app/dictionaries/dictionaries.service';

@Component({
    selector: 'app-create-update-news-categories',
    templateUrl: './create-update-news-categories.component.html',
    styleUrls: ['./create-update-news-categories.component.sass']
})
export class CreateUpdateNewsCategoriesComponent implements OnInit {
    public heading = true;
    isRequesting: boolean;
    createUpdateNewsCategories = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        isActive: new FormControl(true)
    });
    private id: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CreateUpdateNewsCategoriesComponent>,
        private snackbar: MatSnackBar,
        private dictionarieService: DictionariesService
    ) {}

    ngOnInit() {
        if (this.data.id) {
            this.heading = false;
            this.isRequesting = true;
            this.dictionarieService.getDictionariesSubValuesById(this.data.id, 'NewsCategories').subscribe(
                res => {
                    this.createUpdateNewsCategories.patchValue({
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
        if (this.createUpdateNewsCategories.invalid) {
            this.snackbar.open('В форме содержатся ошибки');
            return false;
        }
        if (this.data.id) {
            this.isRequesting = true;
            this.dictionarieService
                .updateDictionariesSubValues(this.createUpdateNewsCategories.value, 'NewsCategories')
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
            const { name, isActive } = this.createUpdateNewsCategories.value;
            this.dictionarieService.createDictionariesSubValues(name, isActive, 'NewsCategories').subscribe(
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
