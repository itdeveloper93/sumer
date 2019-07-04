import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'floating-fab',
    templateUrl: './floating-fab.component.html',
    styleUrls: ['./floating-fab.component.sass']
})
export class FloatingFabComponent implements OnInit {
    @Input() link: string = '';
    @Input() title: string = 'Добавить';
    @Input() icon: string = 'add';

    constructor() {}

    ngOnInit() {}
}
