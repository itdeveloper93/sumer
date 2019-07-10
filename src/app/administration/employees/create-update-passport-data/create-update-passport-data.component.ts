import { Component, OnInit } from '@angular/core';
import { momentX } from 'src/app/app.component';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    CreateUpdatePassportDataService,
    PassportData
} from './create-update-passport-data.service';
import { Nationality, NationalitiesService } from 'src/app/common-services/nationalities.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-create-update-passport-data',
    templateUrl: './create-update-passport-data.component.html',
    styleUrls: ['./create-update-passport-data.component.sass']
})
export class CreateUpdatePassportDataComponent implements OnInit {
    title = 'Редактирование паспортных данных';
    isRequesting: boolean;
    id: string;
    minDate = momentX('01.01.1900');
    aultDate = moment().subtract(18, 'years');
    today = moment();

    nationalities: Nationality[];

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        passportScan: new FormControl(''),
        passportNumber: new FormControl('', Validators.required),
        passportIssueDate: new FormControl('', Validators.required),
        passportIssuer: new FormControl('', Validators.required),
        nationalityId: new FormControl('', Validators.required),
        dateOfBirth: new FormControl('', Validators.required),
        passportAddress: new FormControl('', Validators.required)
    });

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: CreateUpdatePassportDataService,
        private nationalitiesService: NationalitiesService,
        public location: Location,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => (this.id = params.get('id')));
        this.form.get('nationalityId').disable();
        this.getNationalities();
        this.getPassportData(this.id);
    }

    /**
     * Trigger photo upload window
     */
    triggerPhotoUpload() {
        const fileInput: HTMLElement = document.querySelector("[formcontrolname='passportScan']");
        fileInput.click();
    }

    /**
     * Insert selected photo to pewview canvas
     * @param event Event object
     */
    inserPhotoPreview(event) {
        // @ts-ignore
        const canvas: HTMLImageElement = document.getElementsByClassName('photo-preview')[0];
        canvas.src = URL.createObjectURL(event.target.files[0]);
    }

    /**
     * Get passport data
     * @param id Employee ID
     */
    getPassportData(id: string) {
        this.isRequesting = true;
        this.form.disable();

        return this.service.get(id).subscribe(
            response => {
                this.form.patchValue({
                    ...response.data,
                    dateOfBirth: momentX(response.data.dateOfBirth),
                    passportIssueDate: momentX(response.data.passportIssueDate)
                });
            },
            (error: Response) => {
                this.isRequesting = false;
                this.form.enable();

                switch (error.status) {
                    case 0:
                        this.snackbar.open(
                            'Ошибка. Проверьте подключение к Интернету или настройки Firewall.'
                        );
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }
            },
            () => {
                this.isRequesting = false;
                this.form.enable();
            }
        );
    }

    /**
     * Get nationalities
     */
    getNationalities() {
        this.isRequesting = true;

        this.nationalitiesService.get().subscribe(
            response => {
                this.nationalities = response.data;
                this.form.get('nationalityId').enable();
            },
            (error: Response) => {
                this.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open(
                            'Ошибка. Проверьте подключение к Интернету или настройки Firewall.'
                        );
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
     * Submit passport data to server
     * @param payload Form data
     */
    submit(payload: PassportData) {
        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки.');

            console.log(this.form);

            return false;
        }

        this.isRequesting = true;
        this.form.disable();

        this.service.submit({ ...payload, employeeId: this.id }).subscribe(
            response => {
                if (this.form.touched) this.snackbar.open('Изменения сохранены');

                this.router.navigate(['administration/employees/', this.id], {
                    queryParams: { selectedTabIndex: 1 }
                });
            },
            (error: Response) => {
                this.isRequesting = false;
                this.form.enable();

                switch (error.status) {
                    case 0:
                        this.snackbar.open(
                            'Ошибка. Проверьте подключение к Интернету или настройки Firewall.'
                        );
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }
            },
            () => {
                this.isRequesting = false;
                this.form.enable();
            }
        );
    }
}
