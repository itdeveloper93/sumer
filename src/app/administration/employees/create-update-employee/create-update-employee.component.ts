import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CreateUpdateEmployeeService } from './create-update-employee.service';
import { Location } from '@angular/common';
import { Gender, GendersService } from 'src/app/common/services/genders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, EssentialData } from '../employee/employee.service';
import * as moment from 'moment-timezone';
import { ImageUploaderComponent } from 'src/app/image-uploader/image-uploader.component';
import { AppConfig, momentX } from 'src/app/app.config';
import { fade } from 'src/app/animations/all';
import { DictionariesService, Item } from 'src/app/dictionaries/dictionaries.service';

@Component({
    selector: 'create-update-employee',
    templateUrl: './create-update-employee.component.html',
    styleUrls: ['./create-update-employee.component.sass'],
    animations: [fade]
})
export class CreateEmployeeComponent implements OnInit {
    /**
     * Handling image before upload
     */
    imageUploader = ImageUploaderComponent;

    /**
     * Page title
     */
    title: string;

    /**
     * Minimum date available to choose from MatDatePicker
     */
    minDate = AppConfig.constants.MIN_DATE;

    /**
     * Current date
     */
    today = moment();

    /**
     * The max date to show in MatDate picker for age
     */
    aultDate = AppConfig.constants.ADULT_DATE;

    /**
     * ID of current employee. If has value, then we're updating an
     * employee, otherwise – creating
     */
    id: string;

    /**
     * The existing employee data that gets populated to form if we're
     * updating employee
     */
    essentialData: EssentialData;

    /**
     * List of departments for selectbox
     */
    departments: Item[];

    /**
     * List of positions for selectbox
     */
    positions: Position[];

    /**
     * List of genders for selectbox
     */
    genders: Gender[];

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        photo: new FormControl(''),
        lastName: new FormControl('', [Validators.required, Validators.pattern('[а-яА-Я]*')]),
        firstName: new FormControl('', [Validators.required, Validators.pattern('[а-яА-Я]*')]),
        middleName: new FormControl('', Validators.pattern('[а-яА-Я]*')),
        dateOfBirth: new FormControl(''),
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
                // tslint:disable-next-line:max-line-length
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
        private dictionariesService: DictionariesService,
        private service: CreateUpdateEmployeeService,
        public location: Location,
        private gendersService: GendersService,
        private employeeService: EmployeeService
    ) {}

    ngOnInit() {
        // Get and assign employee ID if we want to update his data
        this.route.paramMap.subscribe(params => (this.id = params.get('id')));

        // Fetch and assign nesessary data for select boxes
        this.getDepartments();
        this.getGenders();

        if (this.id) {
            this.title = 'Редактирование сотрудника';
            this.getEssentialData(this.id);

            this.form.get('departmentId').valueChanges.subscribe(value => {
                if (value) this.getPositions(value);
            });
        } else this.title = 'Добавление сотрудника';
    }

    /**
     * Renders selected image to given img tag and assigns it to respective
     * form field
     * @param files Files object
     */
    renderAndAssignPhoto(files: FileList) {
        if (files.length) {
            this.imageUploader.renderImagePreview(files);
            this.form.patchValue({ photo: files[0] });
        }
    }

    /**
     * Get essential data and populate to form
     * @param id Employee ID
     */
    getEssentialData(id: string) {
        this.employeeService.getEssentialData(id).subscribe(
            response => {
                this.form.patchValue({
                    ...response.data,
                    dateOfBirth: momentX(response.data.dateOfBirth),
                    hireDate: momentX(response.data.hireDate)
                });

                this.essentialData = response.data;
            },
            (error: Response) => this.location.back()
        );
    }

    /**
     * Get all genders
     */
    getGenders() {
        this.gendersService.get().subscribe(response => (this.genders = response.data));
    }

    /**
     * Get all departments
     */
    getDepartments() {
        this.dictionariesService
            .getDictionariesForDropdown('Department')
            .subscribe(response => (this.departments = response.data));
    }

    /**
     * Get all positions of passed department
     * @param departmentId Department ID
     */
    getPositions(departmentId: string) {
        this.dictionariesService
            .getPositionsByDepartmentId(departmentId)
            .subscribe(response => (this.positions = response.data));
    }

    // TODO: Don't know what does this do. Fix.
    getPositionsStrategy() {
        if (!this.id) this.getPositions(this.form.get('departmentId').value);
    }

    /**
     * Constructs payload for request
     * @return payload FormData
     */
    constructRequestPayload(): FormData {
        const payload = new FormData();
        const photo = this.form.get('photo').value;

        if (this.id) payload.append('id', this.id);

        // Add form fields to FormData
        Object.keys(this.form.value).forEach(key => {
            // Exclude fields with wrong format
            const excludedFields = ['dateOfBirth', 'hireDate', 'photo'];

            if (!excludedFields.includes(key)) payload.append(key, this.form.value[key]);
        });

        // Re-add excluded fields with right format
        payload.append('dateOfBirth', this.form.get('dateOfBirth').value.toDateString());
        payload.append('hireDate', this.form.get('hireDate').value.toDateString());

        if (photo) payload.append('photo', photo, photo.name);

        return payload;
    }

    /**
     *
     * @param redirectTo
     * @param formDirective
     */
    submit(redirectTo: string, formDirective: FormGroupDirective) {
        // Don't submit if form has errors
        if (this.form.invalid) {
            this.snackbar.open('В форме содержатся ошибки');

            return false;
        }

        const action = this.id ? 'Edit' : 'Create';
        const payload = this.constructRequestPayload();

        this.form.disable();

        this.service.submit(action, payload).subscribe(
            response => {
                if (action === 'Create') {
                    this.snackbar.open('Сотрудник успешно добавлен');

                    switch (redirectTo) {
                        case 'profile':
                            this.router.navigate(['/administration/employees', response.data.id]);
                            break;

                        case 'create':
                            formDirective.resetForm();
                            this.form.reset();
                            this.imageUploader.clearImagePreview();
                            break;
                    }
                } else if (action === 'Edit') {
                    this.router.navigate(['/administration/employees', this.id]);

                    if (this.form.touched) this.snackbar.open('Изменения сохранены.');
                }
            },
            (error: Response) => this.form.enable(),
            () => this.form.enable()
        );
    }
}
