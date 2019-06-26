import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';
import { AuthComponent } from '../auth.component';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent {
    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        phone: new FormControl('', [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
            Validators.pattern('^[0-9]*$')
        ])
    });

    /**
     * Set up custom event to emit up to AuthComponent
     */
    @Output() onResetPassLinkClick = new EventEmitter<boolean>();

    constructor(
        private snackbar: MatSnackBar,
        private authService: AuthService,
        private authComponent: AuthComponent
    ) {}

    /**
     * Provide short access to field from markup for validation
     * purposes.
     */
    get phone() {
        return this.form.get('phone');
    }

    resetPassword() {
        // Don't submit if form has errors
        if (this.form.invalid) return false;

        this.authComponent.switchFormState(this.form, 'disable');

        this.authService
            .resetPassword({ phoneNumber: this.phone.value })
            .subscribe(
                response => {
                    this.snackbar.open(
                        'Новый пароль отправлен на номер ' + this.phone.value
                    );

                    setTimeout(() => this.undo(), 5000);
                },
                error => {
                    this.authComponent.switchFormState(this.form, 'enable');

                    switch (error.status) {
                        case 400:
                            this.snackbar.open('Неверный номер телефона');
                            break;
                    }

                    if (error.status >= 500) {
                        this.snackbar.open(
                            'Ошибка на сервере. Обратитесь к администратору'
                        );
                    }
                },
                () => this.authComponent.switchFormState(this.form, 'enable')
            );
    }

    /**
     * Determines whether the user clicked "Отмена".
     * And emits custom event up to AuthComponent
     */
    undo() {
        this.onResetPassLinkClick.emit(false);
    }
}
