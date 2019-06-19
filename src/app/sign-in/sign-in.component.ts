import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent {
    /**
     * Register form and it's controld
     */
    form = new FormGroup({
        phone: new FormControl('', [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9)
        ]),
        password: new FormControl('', [Validators.required]),
        remember: new FormControl()
    });

    constructor(private _snackbar: MatSnackBar) {}

    /**
     * Provide short access to field from markup for validation
     * purposes.
     */
    get phone() {
        return this.form.get('phone');
    }

    /**
     * Provide short access to field from markup for validation
     * purposes.
     */
    get password() {
        return this.form.get('password');
    }

    /**
     * Do the sign in process
     */
    signIn() {
        // Don't submit if form has errors
        if (this.form.invalid) return false;

        this.form.setErrors({
            invalidCredentials: true
        });

        if (this.form.errors.invalidCredentials) {
            this._snackbar.open('Неверные логин или пароль', '', {
                duration: 5000
            });
        }
    }

    log(value) {
        console.log(value);
    }
}
