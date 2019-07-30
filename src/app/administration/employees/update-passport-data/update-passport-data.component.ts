import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatePassportDataService, PassportData } from './update-passport-data.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { ImageUploaderComponent } from '../../../image-uploader/image-uploader.component';
import { MIN_DATE, ADULT_DATE } from 'src/app/app.config';
import { fade } from 'src/app/animations/all';
import { DictionariesService, Item } from 'src/app/dictionaries/dictionaries.service';
import { momentX } from 'src/app/common/utils';

@Component({
    selector: 'update-passport-data',
    templateUrl: './update-passport-data.component.html',
    styleUrls: ['./update-passport-data.component.sass'],
    animations: [fade]
})
export class UpdatePassportDataComponent implements OnInit {
    /**
     * Handling image before upload
     */
    imageUploader = ImageUploaderComponent;

    /**
     * Page title
     */
    title = this.route.snapshot.data.title;

    /**
     * Determines whether any fetch operation is in progress
     */
    isRequesting: boolean;

    /**
     * Minimum date available to choose from MatDatePicker
     */
    minDate = MIN_DATE;

    /**
     * The max date to show in MatDate picker for age
     */
    aultDate = ADULT_DATE;

    /**
     * Current date
     */
    today = moment();

    /**
     * Employee ID
     */
    id: string;

    /**
     * Passport data that gets populated to 'Паспортные данные' tab
     */
    passportData: PassportData;

    /**
     * List of nationalities for selectbox
     */
    nationalities: Item[];

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
        private service: UpdatePassportDataService,
        public location: Location,
        private snackbar: MatSnackBar,
        private dictionariesService: DictionariesService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => (this.id = params.get('id')));

        this.form.get('nationalityId').disable();
        this.getNationalities();
        this.getPassportData(this.id);
    }

    /**
     * Renders selected image to given canvas and assigns it to respective
     * form input
     * @param files Files object
     */
    renderAndAssignPassportScan(files: FileList) {
        if (files.length) {
            this.imageUploader.renderImagePreview(files);
            this.form.patchValue({ passportScan: files[0] });
        }
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

                this.passportData = response.data;
            },
            (error: Response) => {
                this.isRequesting = false;
                this.form.enable();
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

        this.dictionariesService.getDictionariesForDropdown('Nationality').subscribe(
            response => {
                this.nationalities = response.data;
                this.form.get('nationalityId').enable();
            },
            (error: Response) => (this.isRequesting = false),
            () => (this.isRequesting = false)
        );
    }

    /**
     * Constructs payload for request
     * @return payload FormData
     */
    constructRequestPayload(): FormData {
        const payload = new FormData();

        payload.append('employeeId', this.id);

        // Add form fields to FormData
        Object.keys(this.form.value).forEach(key => {
            // Exclude fields with wrong format
            const excludedFields = ['dateOfBirth', 'passportIssueDate', 'passportScan'];

            if (!excludedFields.includes(key)) payload.append(key, this.form.value[key]);
        });

        // Re-add fields with right format
        payload.append('dateOfBirth', this.form.get('dateOfBirth').value.toDateString());
        payload.append('passportIssueDate', this.form.get('passportIssueDate').value.toDateString());

        if (this.form.get('passportScan').value) {
            payload.append(
                'passportScan',
                this.form.get('passportScan').value,
                this.form.get('passportScan').value.name
            );
        }

        return payload;
    }

    /**
     * Submit passport data to server
     * @param payload Form data
     */
    submit() {
        // Mark all form fields as touched to trigger validation
        this.form.markAllAsTouched();

        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки.');

            return false;
        }

        const payload = this.constructRequestPayload();

        this.isRequesting = true;
        this.form.disable();

        this.service.submit(payload).subscribe(
            response => {
                if (this.form.touched) this.snackbar.open('Изменения сохранены.');

                this.router.navigate(['administration/employees/', this.id], {
                    queryParams: { activeTabIndex: 1 }
                });
            },
            (error: Response) => {
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
