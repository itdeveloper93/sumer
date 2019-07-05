import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'floating-fab',
    templateUrl: './floating-fab.component.html',
    styleUrls: ['./floating-fab.component.sass']
})
export class FloatingFabComponent implements OnInit {
    @Input() link = '';
    @Input() title = 'Добавить';
    @Input() icon = 'add';

    constructor() {}

    ngOnInit() {}
}
