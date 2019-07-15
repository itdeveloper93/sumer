import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CreateUserService } from './create-user.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent {
    /**
     * Determines whether any fetch operation is in progress
     */
    isRequesting: boolean;

    /**
     * Employee ID
     */
    @Input() employeeId: string;

    /**
     * Event which fires when creating the user
     */
    @Output() onAddEnd = new EventEmitter<boolean>();

    constructor(private service: CreateUserService, private snackbar: MatSnackBar) {}

    /**
     * Create user based on employee
     * @param employeeId Emnployee ID
     */
    createUser(employeeId: string) {
        this.isRequesting = true;

        this.service.createUser(employeeId).subscribe(
            response => {
                this.snackbar.open('Пользователь создан. Пароль выслан сотруднику на его номер телефона.');
            },
            (error: Response) => {
                console.log(error);

                switch (error.status) {
                    case 0:
                        this.snackbar.open('Ошибка. Проверьте подключение к Интернету или настройки Firewall.');
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }

                this.isRequesting = false;
                this.onAddEnd.emit(false);
            },
            () => {
                this.isRequesting = false;
                this.onAddEnd.emit(true);
            }
        );
    }
}
