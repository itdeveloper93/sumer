import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MyProfileService, EmployeeData } from './my-profile.service';
import { request } from 'http';
import { fade } from 'src/app/animations/all';

@Component({
    selector: 'my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.sass'],
    animations: [fade]
})
export class MyProfileComponent implements OnInit {
    /**
     * Employee data that gets populated to 'Главное' tab.
     */
    employeeData: EmployeeData;

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Does the same thing as field above, but extracted to separate
     * filed to not invoke global loading indicator while updating
     * just employee data. Maybe its better to extract editing this
     * data logic to separate component, but component naming is
     * already confusing at this point.
     */
    isRequestingEditUserDetails: boolean;

    /**
     * Determines if user wants to edit his essential data.
     */
    isEditing: boolean;

    /**
     * Register update essentials form and it's controls.
     */
    form = new FormGroup({
        email: new FormControl(
            '',
            Validators.pattern(
                "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
            )
        ),
        factualAddress: new FormControl('', Validators.required)
    });

    constructor(private service: MyProfileService, private snackbar: MatSnackBar) {}

    ngOnInit() {
        this.getEmployeeData();
    }

    /**
     * Get employee data.
     */
    getEmployeeData() {
        this.isRequesting = true;

        this.service.getEmployeeData().subscribe(
            response => {
                this.employeeData = response.data;
                this.form.patchValue(response.data);
            },
            (error: Response) => {
                this.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open('Ошибка. Проверьте подключение к Интернету или настройки Firewall.');
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }
            },
            () => (this.isRequesting = false)
        );
    }

    /**
     * Edit employee data.
     */
    editUserDetails() {
        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки');

            return false;
        }

        this.isRequestingEditUserDetails = true;
        this.form.disable();

        this.service.editUserDetails(this.form.value).subscribe(
            response => {
                if (this.form.touched) {
                    this.snackbar.open('Изменения сохранены');

                    // Populate updated data to UI without API call
                    this.employeeData = { ...this.employeeData, ...this.form.value };
                }
            },
            (error: Response) => {
                this.isRequestingEditUserDetails = false;
                this.form.enable();

                switch (error.status) {
                    case 0:
                        this.snackbar.open('Ошибка. Проверьте подключение к Интернету или настройки Firewall.');
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }
            },
            () => {
                this.isRequestingEditUserDetails = false;
                this.isEditing = false;
                this.form.enable();
            }
        );
    }
}
