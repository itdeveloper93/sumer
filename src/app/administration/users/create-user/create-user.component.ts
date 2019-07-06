import { Component, Input } from '@angular/core';
import { CreateUserService } from './create-user.service';

@Component({
    selector: 'create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent {
    @Input() employeeId: string;

    constructor(private service: CreateUserService) {}

    /**
     * Create user based on employee
     * @param employeeId Emnployee ID
     */
    createUser(employeeId: string) {
        console.log(employeeId);

        this.service
            .createUser(employeeId)
            .subscribe(
                response => console.log(response),
                (error: Response) => console.log(error),
                () => console.log(1)
            );
    }
}
