import { Component, Input } from '@angular/core';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.sass']
})
export class AlertComponent {
    @Input() message: string;
    @Input() type: string;

    constructor() {}

    ngOnInit() {}
}
