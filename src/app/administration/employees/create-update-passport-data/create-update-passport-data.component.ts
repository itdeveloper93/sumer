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

    nationalities: Nationality[];

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        scanUrl: new FormControl('', Validators.required),
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
        public location: Location
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => (this.id = params.get('id')));
        this.form.get('nationalityId').disable();
        this.getNationalities();
    }

    /**
     * Trigger photo upload window
     */
    triggerPhotoUpload() {
        const fileInput: HTMLElement = document.querySelector("[formcontrolname='scanUrl']");
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

        return this.service.get(id).subscribe(
            response => {
                this.form.patchValue({ ...this.form.value });
            },
            (error: Response) => {
                this.isRequesting = false;
                console.log(error);
            },
            () => (this.isRequesting = false)
        );
    }

    getNationalities() {
        this.isRequesting = true;

        this.nationalitiesService.get().subscribe(
            response => {
                this.nationalities = response.data;
                this.form.get('nationalityId').enable();
            },
            (error: Response) => {
                this.isRequesting = false;
                console.log(error);
            },
            () => (this.isRequesting = false)
        );
    }

    submit(payload: PassportData) {
        // this.service.submit(payload).subscribe(response => {
        //     console.log(response.data);
        // }, (error: Response) => {
        //     console.log(error);
        // })

        console.log(this.service.submit(payload));

        this.router.navigate(['administration/employees/', this.id]);
    }
}
