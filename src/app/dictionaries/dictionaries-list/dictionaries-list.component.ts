import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DictionariesList } from 'src/app/dictionaries/dictionaries.service';

const dictionariesValue: DictionariesList[] = [
    { name: 'useful-link-categories', displayName: 'Полезные ссылки' },
    { name: 'file-categories', displayName: 'Категории файлов' },
    { name: 'user-lock-reasons', displayName: 'Причины блокировки пользователей' },
    { name: 'positions', displayName: 'Должности' },
    { name: 'employee-lock-reasons', displayName: 'Причины блокировки сотрудников' },
    { name: 'nationalities', displayName: 'Национальности' },
    { name: 'news-categories', displayName: 'Категории полезных ссылок' },
    { name: 'departments', displayName: 'Отделы' }
];

@Component({
    selector: 'app-dictionaries-list',
    templateUrl: './dictionaries-list.component.html',
    styleUrls: ['./dictionaries-list.component.sass']
})
export class DictionariesListComponent implements OnInit {
    /**
     * Page title.
     */
    title = this.route.snapshot.data['title'];

    /**
     * Determines whether any fetch operation is in progress.
     */
    isRequesting: boolean;

    /**
     * Columns to display in the table.
     */
    displayedColumns: string[];

    /**
     * List of dictionaries.
     */
    dictionaries: DictionariesList[] = dictionariesValue;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.displayedColumns = ['name', 'actions'];
    }
}
