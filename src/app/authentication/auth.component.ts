import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.sass']
})
export class AuthComponent {
    cardTitle = 'Вход в систему';

    /**
     * Determines whether user forgot the password
     */
    forgotPassword = false;

    constructor(private authService: AuthService) {}

    setForgotPasswordState($event) {
        this.forgotPassword = $event;

        if ($event) this.cardTitle = 'Сброс пароля';
        else this.cardTitle = 'Вход в систему';
    }
}
