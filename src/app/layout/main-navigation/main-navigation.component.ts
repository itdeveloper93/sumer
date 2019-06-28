import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main-navigation',
    templateUrl: './main-navigation.component.html',
    styleUrls: ['./main-navigation.component.sass']
})
export class MainNavigationComponent implements OnInit {
    config = {
        classname: 'main-navigation',
        fontColor: '#D2D7E8',
        selectedListFontColor: '#533DFE',
        interfaceWithRoute: true,
        highlightOnSelect: true
    };

    appitems = [
        {
            label: 'Рабочий стол',
            icon: 'desktop_windows',
            link: ''
        },
        {
            label: 'Новости и информация',
            icon: 'library_books',
            items: [
                { label: 'Добавить статью', link: '/news/add' },
                { label: 'Все статьи', link: '/news' },
                { label: 'Полезные ссылки', link: '/news/useful-links' }
            ]
        },
        {
            label: 'Товары',
            icon: 'local_offer',
            items: [
                { label: 'Добавить товар', link: '/goods/add' },
                { label: 'Все товары', link: '/goods' },
                { label: 'Остатки товаров', link: '/goods/remains' }
            ]
        },
        {
            label: 'Склады',
            icon: 'storage',
            items: [
                { label: 'Все склады', link: '/warehouses/add' },
                { label: 'Импорт на склад', link: '/warehouses/import' },
                {
                    label: 'Перемещение между складами',
                    link: '/warehouses/movement'
                },
                { label: 'Продажа со склада', link: '/warehouses/sales' },
                { label: 'Списание', link: '/warehouses/write-off' },
                { label: 'Ревизия', link: '/warehouses/audit' }
            ]
        },
        {
            label: 'Магазины',
            icon: 'shopping_cart',
            items: [
                { label: 'Все магазины', link: '/stores' },
                {
                    label: 'Количественный отчет по продажам',
                    link: '/stores/quantitative-report'
                },
                {
                    label: 'Все продажи по магазинам',
                    link: '/stores/all-sales'
                },
                {
                    label: 'Все продажи по товарам',
                    link: '/stores/sales-by-goods'
                },
                {
                    label: 'Возврат товаров на склад',
                    link: '/stores/returns-to-warehouse'
                }
            ]
        },
        {
            label: 'Ярмарки',
            icon: 'store',
            items: [
                { label: 'Новая ярмарка', link: '/fairs/add' },
                {
                    label: 'Активные ярмарки',
                    link: '/fairs'
                },
                {
                    label: 'Архив',
                    link: '/fairs/archieved'
                }
            ]
        },
        {
            label: 'Бухгалтерия',
            icon: 'keyboard'
        },
        {
            label: 'Контрагенты',
            icon: 'work'
        },
        {
            label: 'Транспорт',
            icon: 'directions_car'
        },
        {
            label: 'Справочники',
            icon: 'view_list'
        },
        {
            label: 'Администрирование',
            icon: 'settings_input_component',
            items: [
                { label: 'Сотрудники', link: '/admin/employees' },
                {
                    label: 'Пользователи',
                    link: '/admin/users'
                },
                {
                    label: 'Административно-территориальное деление',
                    link: '/admin/administrative-divisions'
                },
                {
                    label: 'Организационная структура SUMR',
                    link: '/admin/organizational structure'
                }
            ]
        }
    ];
    constructor() {}

    ngOnInit() {}
}
