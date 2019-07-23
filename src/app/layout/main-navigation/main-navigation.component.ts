import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'main-navigation',
    templateUrl: './main-navigation.component.html',
    styleUrls: ['./main-navigation.component.sass']
})
export class MainNavigationComponent implements OnInit {
    /**
     * Granted permissions
     */
    permissions: object = this.app.grantedPermissions;

    /**
     * Component config object
     */
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
            link: '/'
        },
        {
            hidden: true,
            label: 'Новости и информация',
            icon: 'library_books',
            items: [
                { label: 'Добавить статью', link: '/news/add' },
                { label: 'Все статьи', link: '/news' },
                { label: 'Полезные ссылки', link: '/news/useful-links' }
            ]
        },
        {
            hidden: true,
            label: 'Товары',
            icon: 'local_offer',
            items: [
                { label: 'Добавить товар', link: '/goods/add' },
                { label: 'Все товары', link: '/goods' },
                { label: 'Остатки товаров', link: '/goods/remains' }
            ]
        },
        {
            hidden: true,
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
            hidden: true,
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
            hidden: true,
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
            hidden: true,
            label: 'Бухгалтерия',
            icon: 'keyboard'
        },
        {
            hidden: true,
            label: 'Контрагенты',
            icon: 'work'
        },
        {
            hidden: true,
            label: 'Транспорт',
            icon: 'directions_car'
        },
        {
            // hidden: true,
            label: 'Справочники',
            icon: 'view_list',
            link: 'dictionaries'
        },
        {
            label: 'Администрирование',
            icon: 'settings_input_component',
            items: [
                {
                    hidden: this.permissions['Employee.All'] ? false : true,
                    label: 'Сотрудники',
                    items: [
                        {
                            hidden: this.permissions['Employee.Create'] ? false : true,
                            label: 'Добавить',
                            link: '/administration/employees/create'
                        },
                        {
                            hidden: this.permissions['Employee.All'] ? false : true,
                            label: 'Активные',
                            link: '/administration/employees/active'
                        },
                        {
                            hidden: this.permissions['Employee.All'] ? false : true,
                            label: 'Заблокированные',
                            link: '/administration/employees/locked'
                        }
                    ]
                },
                {
                    hidden: true,
                    label: 'Административно-территориальное деление',
                    link: '/administration/administrative-divisions'
                },
                {
                    hidden: true,
                    label: 'Организационная структура SUMR',
                    link: '/administration/organizational-structure'
                }
            ]
        }
    ];
    constructor(private router: Router, private app: AppComponent) {}

    ngOnInit() {}
}
