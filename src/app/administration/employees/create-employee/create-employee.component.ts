import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
import {
    DepartmentsAndPositionsService,
    Department
} from 'src/app/common-services/departments-and-positions.service';
import { CreateUpdateEmployeeService } from './create-update-employee.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-create-employee',
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.sass']
})
export class CreateEmployeeComponent implements OnInit {
    isRequesting: boolean;
    minDate = moment('01.01.1900', 'DD.MM.YYYY');
    departments: Department[];
    positions: Position[];

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        photo: new FormControl(''),
        lastName: new FormControl('Расулов', [
            Validators.required,
            Validators.pattern('[а-яА-Яa-zA-z]*')
        ]),
        firstName: new FormControl('Азамат', [
            Validators.required,
            Validators.pattern('[а-яА-Яa-zA-z]*')
        ]),
        middleName: new FormControl('Олимович', Validators.pattern('[а-яА-Яa-zA-z]*')),
        dateOfBirth: new FormControl('15.09.1995'),
        genderId: new FormControl('C36BC960-5424-4A96-94FA-E2776E0461F6'),
        hireDate: new FormControl('17.06.2019'),
        departmentId: new FormControl(''),
        positionId: new FormControl(''),
        phone: new FormControl('934114400', [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
            Validators.pattern('^[0-9]*$')
        ]),
        email: new FormControl(
            'evolution.media.pro@ya.ru',
            Validators.pattern(
                "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
            )
        ),
        factualAddress: new FormControl('г. Душанбе, улица, дом, квартира', Validators.required),
        description: new FormControl('Дополнительное описание, не превышающее 256 символов')
    });

    constructor(
        private snackbar: MatSnackBar,
        private departmentsAndPositionsService: DepartmentsAndPositionsService,
        private service: CreateUpdateEmployeeService,
        private location: Location
    ) {}

    ngOnInit() {
        // Disable form fields that are depended on fetching their values
        this.form.get('departmentId').disable();
        this.form.get('positionId').disable();

        this.getDepartments();
    }

    /**
     * Trigger photo upload window
     */
    triggerPhotoUpload() {
        const fileInput: HTMLElement = document.querySelector("[formcontrolname='photo']");
        fileInput.click();
    }

    /**
     * Insert selected photo to pewview canvas
     * @param event Event object
     */
    inserPhotoPreview(event) {
        const canvas: HTMLImageElement = document.getElementsByClassName('photo-preview')[0];
        canvas.src = URL.createObjectURL(event.target.files[0]);
    }

    /**
     * Get all departments
     */
    getDepartments() {
        this.isRequesting = true;

        this.departmentsAndPositionsService.getDepartments().subscribe(
            response => (this.departments = response.data),
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
            () => {
                this.isRequesting = false;
                this.form.get('departmentId').enable();
            }
        );
    }

    /**
     * Get positions
     */
    getPositions() {
        this.isRequesting = true;
        const departmentId = this.form.get('departmentId').value;

        this.departmentsAndPositionsService.getPositions(departmentId).subscribe(
            response => (this.positions = response.data),
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
            () => {
                this.isRequesting = false;
                this.form.get('positionId').enable();
            }
        );
    }

    /**
     * Create employee
     */
    create() {
        // Don't submit if form has errors
        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки.');

            return false;
        }

        console.log(this.form.value);

        this.isRequesting = true;
        this.form.disable();

        this.service.create(this.form.value).subscribe(
            response => {
                console.log(response);

                this.snackbar.open('Сотрудник успешно добавлен');

                this.location.back();
            },
            (error: Response) => {
                this.isRequesting = false;
                this.form.enable();

                console.log(error);

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
