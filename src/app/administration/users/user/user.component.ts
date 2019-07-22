import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
    /**
     * User ID
     */
    @Input() id: string;

    /**
     * Determines whther user is locked or not
     */
    isLocked: boolean;

    constructor(private service: UserService, private snackbar: MatSnackBar) {}

    ngOnInit() {
        this.get();
    }

    /**
     * Get user data
     */
    get() {
        this.service.get(this.id).subscribe(response => {
            this.isLocked = response.data.isLocked;
            this.isLocked;
        });
    }
}
