import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MyProfileService, EmployeeData } from './my-profile.service';
import { fade } from 'src/app/animations/all';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    isEditingUserDetails: boolean;

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

    constructor(private service: MyProfileService, private snackbar: MatSnackBar, private http: HttpClient) {}

    ngOnInit() {
        this.getEmployeeData();

        // this.http.get(environment.API.URL + 'HideInfo/ErrorByCode?statusCode=0').subscribe(res => {
        //     console.log(res);
        // });
    }

    /**
     * Get employee data.
     */
    getEmployeeData() {
        this.service.getEmployeeData().subscribe(response => {
            this.employeeData = response.data;
            this.form.patchValue(response.data);
        });
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
            },
            () => {
                this.isRequestingEditUserDetails = false;
                this.isEditingUserDetails = false;
                this.form.enable();
            }
        );
    }
}
