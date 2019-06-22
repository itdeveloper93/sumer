import { AuthService } from '../auth.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

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

    /**
     * Set up custom event to emit up to AuthComponent
     */
    @Output() onResetPassLinkClick = new EventEmitter<boolean>();

    constructor(
        private snackbar: MatSnackBar,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
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

        this.form.disable();

        this.authService.signIn(credentials).subscribe(response => {
            if (response) {
                const returnUrl = this.route.snapshot.queryParamMap.get(
                    'returnUrl'
                );
                this.router.navigate([returnUrl || '/']);
            } else {
                this.snackbar.open('Неверные логин или пароль', '', {
                    duration: 5000
                });
            }

            this.form.enable();
        });
    }

    /**
     * Determines whether the user clicked "Забыл пароль".
     * And emits custom event up to AuthComponent
     * @param reset
     */
    resetPassword() {
        this.onResetPassLinkClick.emit(true);
    }
}
