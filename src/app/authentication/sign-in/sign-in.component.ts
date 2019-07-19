import { AuthComponent } from './../auth.component';
import { AuthService } from '../auth.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
    /**
     * Determines whether any fetch operation is in progress
     */
    isRequesting: boolean;

    /**
     * Register form and it's controls.
     */
    form = new FormGroup({
        phoneNumber: new FormControl('', [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
            Validators.pattern('^[0-9]*$')
        ]),
        password: new FormControl('', [Validators.required]),
        rememberMe: new FormControl(false)
    });

    /**
     * Event that fires when 'Забыл пароль' link clicked.
     */
    @Output() onResetPassLinkClick = new EventEmitter<boolean>();

    constructor(
        private snackbar: MatSnackBar,
        public authService: AuthService,
        public authComponent: AuthComponent,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isRequesting = this.authComponent.isRequesting;
    }

    /**
     * Do the sign in process.
     */
    signIn() {
        // Don't submit if form has errors
        if (this.form.invalid) return false;

        this.authComponent.switchFormState(this.form, 'disable');

        this.authService.signIn(this.form.value).subscribe(
            response => {
                const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                this.router.navigate([returnUrl || '/']);
            },
            (error: Response) => {
                this.authComponent.switchFormState(this.form, 'enable');

                switch (error.status) {
                    case 400:
                        this.snackbar.open('Неверные логин или пароль');
                        break;
                }

                if (error.status >= 500) {
                    this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                }
            },
            () => this.authComponent.switchFormState(this.form, 'enable')
        );
    }

    /**
     * Determines whether the user clicked "Забыл пароль".
     * And emits custom event up to AuthComponent.
     */
    resetPassword() {
        this.onResetPassLinkClick.emit(true);
    }
}
