import { Component, Input } from '@angular/core';
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
export class ChangePasswordComponent {
    /**
     * User phone number / login.
     */
    @Input() phone: string;

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Determines whether confirmation code was requested.
     */
    isConfirmationCodePending: boolean;

    /**
     * Determines whether confirmation code resend button is visible.
     */
    isConfirmationCodeResendButtonVisible: boolean;

    /**
     * Register form and it's controls.
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

    /**
     * Request confirmation code.
     */
    requestConfirmationCode() {
        // Mark all form fields as touched to trigger validation
        this.form.get('password').markAsTouched();
        this.form.get('confirmPassword').markAsTouched();

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
        this.form.disable();
        this.isConfirmationCodeResendButtonVisible = false;

        this.service.requestConfirmationCode().subscribe(
            response => {},
            (error: Response) => {
                this.isRequesting = false;
                this.form.enable();
            },
            () => {
                this.isRequesting = false;
                this.isConfirmationCodePending = true;
                this.form.enable();

                setTimeout(() => {
                    this.isConfirmationCodeResendButtonVisible = !this.isConfirmationCodeResendButtonVisible;
                }, 120000);
            }
        );
    }

    /**
     * Change password.
     * @param formDirective Form directive for clearing form values.
     */
    submit(formDirective: FormGroupDirective) {
        // Mark all form fields as touched to trigger validation
        this.form.get('smsConfirmationCode').markAsTouched();

        if (!this.form.get('smsConfirmationCode').value) {
            this.snackbar.open('Введите код подтверждения');

            return false;
        }

        if (this.form.get('smsConfirmationCode').invalid) {
            this.snackbar.open('Неверный код подтверждения');

            return false;
        }

        this.isRequesting = true;
        this.form.disable();

        this.service.changePassword(this.form.value).subscribe(
            response => this.snackbar.open('Новый пароль установлен'),
            (error: Response) => {
                this.isRequesting = false;
                this.form.enable();
                this.isConfirmationCodePending = false;
            },
            () => {
                this.isRequesting = false;
                this.isConfirmationCodePending = false;

                formDirective.resetForm();
                this.form.reset();

                this.form.enable();
            }
        );
    }
}
