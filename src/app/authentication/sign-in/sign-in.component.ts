import { SignInService } from './sign-in.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent {
    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        phone: new FormControl('934114400', [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9)
        ]),
        password: new FormControl('password1', [Validators.required]),
        remember: new FormControl(false)
    });

    private _invalidCredentials: boolean;

    constructor(
        private _snackbar: MatSnackBar,
        private _authService: SignInService,
        private _router: Router
    ) {}

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

        const credentials = {
            phoneNumber: this.form.value.phone,
            password: this.form.value.password
        };

        this._authService.signIn(credentials).subscribe(response => {
            console.log(response);

            // if (response) this._router.navigate(['/']);
            // else this._invalidCredentials = true;
        });

        if (this._invalidCredentials) {
            this._snackbar.open('Неверные логин или пароль', '', {
                duration: 5000
            });
        }
    }
}
