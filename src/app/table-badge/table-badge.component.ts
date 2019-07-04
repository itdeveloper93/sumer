import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-badge',
    templateUrl: './table-badge.component.html',
    styleUrls: ['./table-badge.component.sass']
})
export class TableBadgeComponent implements OnInit {
    @Input() state: boolean;
    @Input() value: string;

    constructor() {}

    ngOnInit() {}
}
