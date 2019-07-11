import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {
    DepartmentsAndPositionsService,
    Department
} from 'src/app/common-services/departments-and-positions.service';
import { CreateUpdateEmployeeService } from './create-update-employee.service';
import { Location } from '@angular/common';
import { Gender, GendersService } from 'src/app/common-services/genders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee/employee.service';
import { momentX } from 'src/app/app.component';
import * as moment from 'moment-timezone';
import { Employee } from '../employees.service';

@Component({
    selector: 'app-create-employee',
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.sass']
})
export class CreateEmployeeComponent implements OnInit {
    title: string;

    isRequesting: boolean;
    minDate = momentX('01.01.1900');
    today = moment();
    aultDate = moment().subtract(18, 'years');

    // For creating
    departments: Department[];
    positions: Position[];
    genders: Gender[];

    // For editing
    id: string;

    fileToUpload: File = null;
    essentialData: Employee;

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        photo: new FormControl(null),
        lastName: new FormControl('', [Validators.required, Validators.pattern('[а-яА-Яa-zA-z]*')]),
        firstName: new FormControl('', [
            Validators.required,
            Validators.pattern('[а-яА-Яa-zA-z]*')
        ]),
        middleName: new FormControl('', Validators.pattern('[а-яА-Яa-zA-z]*')),
        dateOfBirth: new FormControl(''),
        // TODO: Fetch genders from server
        genderId: new FormControl(''),
        hireDate: new FormControl(''),
        departmentId: new FormControl(''),
        positionId: new FormControl(''),
        phone: new FormControl('', [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
            Validators.pattern('^[0-9]*$')
        ]),
        email: new FormControl(
            '',
            Validators.pattern(
                "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
            )
        ),
        factualAddress: new FormControl('', Validators.required),
        description: new FormControl('')
    });

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar,
        private departmentsAndPositionsService: DepartmentsAndPositionsService,
        private service: CreateUpdateEmployeeService,
        public location: Location,
        private gendersService: GendersService,
        private employeeService: EmployeeService
    ) {}

    ngOnInit() {
        // Get and assign employee ID if we want to edit his data
        this.route.paramMap.subscribe(params => (this.id = params.get('id')));

        // Disable form fields that are depended on fetching their values
        this.form.get('departmentId').disable();
        this.form.get('positionId').disable();
        this.form.get('genderId').disable();

        // Fetch nesessary initial data
        this.getDepartments();
        this.getGenders();

        if (this.id) {
            this.title = 'Редактирование сотрудника';
            this.getEssentialData(this.id);
            this.form.get('departmentId').valueChanges.subscribe(value => {
                if (value) this.getPositions(value);
            });
        } else {
            this.title = 'Добавление сотрудника';
        }
    }

    log(event) {
        console.log(event);
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
    onPhotoChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];

            // @ts-ignore
            const canvas: HTMLImageElement = document.getElementsByClassName('photo-preview')[0];
            canvas.src = URL.createObjectURL(file);

            //this.form.get('photo').setValue(file);
            this.fileToUpload = event.target.files.item(0);
        }
    }

    getGenders() {
        this.isRequesting = false;

        this.gendersService.get().subscribe(
            response => (this.genders = response.data),
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
                this.form.get('genderId').enable();
            }
        );
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
    getPositions(departmentId: string) {
        this.isRequesting = true;

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

    getPositionsStrategy() {
        if (!this.id) this.getPositions(this.form.get('departmentId').value);
    }

    /**
     * Create employee
     */
    create(redirectTo: string, formDirective: FormGroupDirective) {
        this.isRequesting = true;
        this.form.disable();

        // Don't submit if form has errors
        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки.');

            return false;
        }

        const payload = new FormData();

        //payload.append('id', this.id);
        Object.keys(JSON.parse(JSON.stringify(this.form.value))).forEach(key =>
            payload.append(key, JSON.parse(JSON.stringify(this.form.value))[key])
        );

        payload.delete('photo');
        payload.append('photo', this.fileToUpload, this.fileToUpload.name);

        this.service.create(payload).subscribe(
            response => {
                this.snackbar.open('Сотрудник успешно добавлен');

                switch (redirectTo) {
                    case 'profile':
                        this.router.navigate(['/administration/employees', response.data.id]);
                        break;

                    case 'create':
                        formDirective.resetForm();
                        this.form.reset();
                        break;
                }
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
            }
        );
    }

    /**
     * Get essential data and populate to form
     * @param id Employee ID
     */
    getEssentialData(id: string) {
        this.isRequesting = true;

        this.employeeService.getEssentialData(id).subscribe(
            response => {
                this.form.patchValue({
                    ...response.data,
                    dateOfBirth: momentX(response.data.dateOfBirth),
                    hireDate: momentX(response.data.hireDate)
                });

                this.essentialData = response.data;
            },
            (error: Response) => {
                this.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open(
                            'Ошибка. Проверьте подключение к Интернету или настройки Firewall.'
                        );
                        break;

                    case 400:
                        this.snackbar.open('Ошибка. Проверьте введенные данные.');
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        this.location.back();
                        break;
                }
            },
            () => (this.isRequesting = false)
        );
    }

    edit(id: string) {
        this.isRequesting = true;

        const payload = new FormData();

        payload.append('id', this.id);
        Object.keys(JSON.parse(JSON.stringify(this.form.value))).forEach(key =>
            payload.append(key, JSON.parse(JSON.stringify(this.form.value))[key])
        );

        payload.delete('photo');

        if (this.fileToUpload) {
            payload.append('photo', this.fileToUpload, this.fileToUpload.name);
        }

        //this.service.edit({ ...this.form.value, id }).subscribe(
        this.service.edit(payload).subscribe(
            response => {
                this.router.navigate(['/administration/employees', this.id]);

                if (this.form.touched) this.snackbar.open('Изменения сохранены.');
            },
            (error: Response) => {
                this.isRequesting = false;

                console.log(error);

                switch (error.status) {
                    case 0:
                        this.snackbar.open(
                            'Ошибка. Проверьте подключение к Интернету или настройки Firewall.'
                        );
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору.`);
                        break;
                }
            }
        );
    }

    submit(redirectTo: string, formDirective: FormGroupDirective) {
        if (this.id) this.edit(this.id);
        else this.create(redirectTo, formDirective);
    }
}
