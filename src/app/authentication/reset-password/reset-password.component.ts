import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent {
    /**
     * Determines if the user has forgotten the
     * password
     */
    forgot: boolean;

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        phone: new FormControl('934114400', [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9)
        ])
    });

    /**
     * Set up custom event to emit up to AuthComponent
     */
    @Output() onResetPassLinkClick = new EventEmitter<boolean>();

    constructor(
        private snackbar: MatSnackBar,
        private authService: AuthService
    ) {}

    /**
     * Provide short access to field from markup for validation
     * purposes.
     */
    get phone() {
        return this.form.get('phone');
    }

    resetPassword() {
        this.form.disable();

        this.authService
            .resetPassword({ phoneNumber: this.phone.value })
            .subscribe(response => {
                this.form.enable();

                if (response) {
                    this.snackbar.open(
                        'Новый пароль отправлен на номер ' + this.phone.value
                    );

                    setTimeout(() => {
                        this.undoResetPassword();
                    }, 5000);
                } else {
                    this.snackbar.open('Неверный номер телефона');
                }
            });
    }

    /**
     * Determines whether the user clicked "Отмена".
     * And emits custom event up to AuthComponent
     */
    undoResetPassword() {
        this.onResetPassLinkClick.emit(false);
    }
}
