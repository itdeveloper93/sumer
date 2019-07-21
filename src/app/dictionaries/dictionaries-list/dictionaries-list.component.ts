import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DictionariesList } from 'src/app/dictionaries/dictionaries.service';

const dictionariesValue: DictionariesList[] = [
    { name: 'useful-link-categories', displayName: 'Полезная ссылка' },
    { name: 'file-categories', displayName: 'Категория файла' },
    { name: 'user-lock-reasons', displayName: 'Причина блокировки пользователя' },
    { name: 'positions', displayName: 'Позиция' },
    { name: 'employee-lock-reasons', displayName: 'Причина блокировки сотрудника' },
    { name: 'nationalities', displayName: 'Национальность' },
    { name: 'news-categories', displayName: 'Категория полезных ссылок' },
    { name: 'departments', displayName: 'Отдел' }
];

@Component({
    selector: 'app-dictionaries-list',
    templateUrl: './dictionaries-list.component.html',
    styleUrls: ['./dictionaries-list.component.sass']
})
export class DictionariesListComponent implements OnInit {
    title = this.route.snapshot.data['title'];

    isRequesting: boolean;
    displayedColumns: any;
    dictionaries = dictionariesValue;
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.displayedColumns = ['name', 'actions'];
    }
}
