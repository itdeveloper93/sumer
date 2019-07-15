import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

export interface DictionariesList {
    id: number;
    name: string;
    hairDate: string;
    Author: string;
}

const dictionaries: DictionariesList[] = [
    { id: 1, name: 'Подразделение', hairDate: '7/10/2019 13:00', Author: 'Искандар Мирзоев' }
];
@Component({
    selector: 'app-dictionaries-list',
    templateUrl: './dictionaries-list.component.html',
    styleUrls: ['./dictionaries-list.component.sass']
})
export class DictionariesListComponent implements OnInit {
    title = this.route.snapshot.data['title'];

    employees: MatTableDataSource<DictionariesList>;
    isRequesting: boolean;
    department = dictionaries;
    displayedColumns: any;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.displayedColumns = ['fullName', 'departmentAndPosition', 'contacts', 'actions'];
    }
}
