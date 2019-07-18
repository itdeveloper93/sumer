import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ChangePasswordService } from './change-password.service';
import { MatSnackBar } from '@angular/material';
import { fade } from 'src/app/animations/all';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.sass'],
    animations: [fade]
})
export class ChangePasswordComponent implements OnInit {
    /**
     * Determines whether any fetch operation is in progress
     */
    isRequesting: boolean;

    /**
     * Determines whether confirmation code was requested
     */
    isConfirmationCodePending: boolean;

    /**
     * Determines whether confirmation code resend button is visible
     */
    isConfirmationCodeResendButtonVisible: boolean;

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        smsConfirmationCode: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4)
        ])
    });

    constructor(private service: ChangePasswordService, private snackbar: MatSnackBar) {}

    ngOnInit() {}

    /**
     * Request confirmation code.
     */
    requestConfirmationCode() {
        if (!this.form.get('password').value) {
            this.snackbar.open('Введите новый пароль');

            return false;
        }

        if (
            this.form.get('password').value !== this.form.get('confirmPassword').value ||
            !this.form.get('confirmPassword').value
        ) {
            this.snackbar.open('Пароли не совпадают');

            return false;
        }

        this.isRequesting = true;
        this.form.get('password').disable();
        this.form.get('confirmPassword').disable();
        this.form.get('smsConfirmationCode').disable();
        this.isConfirmationCodeResendButtonVisible = false;

        this.service.requestConfirmationCode().subscribe(
            response => this.snackbar.open('На Ваш номер отправлено СМС с кодом подтверждения'),
            (error: Response) => {
                this.isRequesting = false;
                this.form.get('password').enable();
                this.form.get('confirmPassword').enable();
                this.form.get('smsConfirmationCode').enable();

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
                this.isRequesting = false;
                this.isConfirmationCodePending = true;
                this.form.get('password').enable();
                this.form.get('confirmPassword').enable();
                this.form.get('smsConfirmationCode').enable();

                setTimeout(() => {
                    this.isConfirmationCodeResendButtonVisible = !this.isConfirmationCodeResendButtonVisible;
                }, 120000);
            }
        );
    }

    /**
     * Change password.
     * @param formDirective Form directive for clearing form values
     */
    submit(formDirective: FormGroupDirective) {
        if (!this.form.get('smsConfirmationCode').value) {
            this.snackbar.open('Введите код подтверждения');

            return false;
        }

        if (this.form.get('smsConfirmationCode').invalid) {
            this.snackbar.open('Неверный код подтверждения');

            return false;
        }

        this.isRequesting = true;

        this.service.changePassword(this.form.value).subscribe(
            response => this.snackbar.open('Новый пароль установлен'),
            (error: Response) => {
                this.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open('Ошибка. Проверьте подключение к Интернету или настройки Firewall.');
                        this.isConfirmationCodePending = false;
                        break;

                    case 400:
                        this.snackbar.open('Неверный код подтверждения');
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        this.isConfirmationCodePending = false;
                        break;
                }
            },
            () => {
                this.isRequesting = false;
                this.isConfirmationCodePending = false;

                formDirective.resetForm();
                this.form.reset();
            }
        );
    }
}
