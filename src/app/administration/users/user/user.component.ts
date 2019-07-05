import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
    @Input() employeeId: string;

    constructor() {}

    ngOnInit() {
        console.log(this.employeeId);
    }
}
