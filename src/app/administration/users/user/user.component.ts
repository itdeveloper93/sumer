import { Component, Input } from '@angular/core';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.sass']
})
export class UserComponent {
    /**
     * User ID
     */
    @Input() id: string;
}
