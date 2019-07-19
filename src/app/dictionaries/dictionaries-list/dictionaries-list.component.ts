import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DictionariesService, DictionariesList } from 'src/app/common-services/dictionaries.service';

const dictionariesValue: DictionariesList[] = [
    { name: 'UsefulLinkCategory', displayName: 'Полезная ссылка' },
    { name: 'FileCategory', displayName: 'Категория файла' },
    { name: 'UserLockReason', displayName: 'Причина блокировки пользователя' },
    { name: 'Position', displayName: 'Позиция' },
    { name: 'EmployeeLockReason', displayName: 'Причина блокировки сотрудника' },
    { name: 'Nationality', displayName: 'Национальность' },
    { name: 'NewsCategories', displayName: 'Категория полезных ссылок' },
    { name: 'Department', displayName: 'Отдел' }
];

@Component({
    selector: 'app-dictionaries-list',
    templateUrl: './dictionaries-list.component.html',
    styleUrls: ['./dictionaries-list.component.sass']
})
export class DictionariesListComponent implements OnInit {
    title = this.route.snapshot.data['title'];

    // dictionaries: MatTableDataSource<DictionariesList[]>;
    isRequesting: boolean;
    displayedColumns: any;
    dictionaries = dictionariesValue;
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.displayedColumns = ['fullName', 'departmentAndPosition', 'contacts', 'actions'];
    }
}
