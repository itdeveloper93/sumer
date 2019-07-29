import { Component, Input, OnInit } from '@angular/core';
import { UserService, User } from './user.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
    /**
     * User ID.
     */
    @Input() id: string;

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Determines whther user is locked or not.
     */
    isLocked: boolean;

    /**
     * User data.
     */
    user: User;

    constructor(private service: UserService, private snackbar: MatSnackBar, private authService: AuthService) {}

    ngOnInit() {
        this.get();
    }

    /**
     * Get user data
     */
    get() {
        this.service.get(this.id).subscribe(response => {
            this.user = response.data;
            this.isLocked = response.data.isLocked;
        });
    }

    /**
     * Reset password.
     */
    resetPassword() {
        this.isRequesting = true;

        this.authService
            .resetPassword({ phoneNumber: this.user.userName })
            .subscribe(
                response => this.snackbar.open('Новый пароль отправлен на номер ' + this.user.userName),
                (error: Response) => (this.isRequesting = false),
                () => (this.isRequesting = false)
            );
    }
}
