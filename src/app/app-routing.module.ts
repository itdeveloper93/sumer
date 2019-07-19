import { AuthGuard } from './authentication/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AuthComponent } from './authentication/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { EmployeesListComponent } from './administration/employees/employees-list/employees-list.component';
import { EmployeeComponent } from './administration/employees/employee/employee.component';
import { CreateEmployeeComponent } from './administration/employees/create-employee/create-employee.component';
import { DictionariesListComponent } from './dictionaries/dictionaries-list/dictionaries-list.component';
import { DepartmentListComponent } from './dictionaries/department-list/department-list.component';
import { UsefulLinkCategoryComponent } from './dictionaries/useful-link-category/useful-link-category.component';
import { FileCategoryComponent } from './dictionaries/file-category/file-category.component';
import { UserLockReasonComponent } from './dictionaries/user-lock-reason/user-lock-reason.component';
import { PositionComponent } from './dictionaries/position/position.component';
import { EmployeeLockReasonComponent } from './dictionaries/employee-lock-reason/employee-lock-reason.component';
import { NationalityComponent } from './dictionaries/nationality/nationality.component';
import { NewsCategoriesComponent } from './dictionaries/news-categories/news-categories.component';
import { UpdatePassportDataComponent } from './administration/employees/update-passport-data/update-passport-data.component';
import { MyProfileComponent } from './administration/users/my-profile/my-profile.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: { title: 'Рабочий стол' },
                children: [
                    {
                        path: 'notifications',
                        component: DashboardComponent,
                        data: { title: 'Уведомления' }
                    }
                ]
            },
            {
                path: 'administration',
                data: { title: 'Администрирование' },
                children: [
                    {
                        path: 'employees',
                        data: { title: 'Сотрудники', showLocked: false },
                        children: [
                            {
                                path: 'active',
                                data: { title: 'Активные' },
                                component: EmployeesListComponent
                            },
                            {
                                path: 'locked',
                                data: { title: 'Заблокированные', showLocked: true },
                                component: EmployeesListComponent
                            },
                            {
                                path: 'create',
                                data: { title: 'Добавить сотрудника' },
                                component: CreateEmployeeComponent
                            },
                            {
                                path: 'edit',
                                data: { title: 'Редактирование сотрудника' },
                                children: [
                                    {
                                        path: 'essentials/:id',
                                        data: 'Главное',
                                        component: CreateEmployeeComponent
                                    },
                                    {
                                        path: 'passport-data/:id',
                                        data: 'Паспортные данные',
                                        component: UpdatePassportDataComponent
                                    }
                                ]
                            },
                            {
                                path: ':id',
                                data: { title: 'Сотрудник' },
                                component: EmployeeComponent
                            }
                        ]
                    },
                    {
                        path: 'users',
                        data: { title: 'Пользователи', showLocked: false },
                        children: [
                            {
                                path: 'active',
                                data: { title: 'Активные' },
                                component: EmployeesListComponent
                            },
                            {
                                path: 'locked',
                                data: { title: 'Заблокированные', showLocked: true },
                                component: EmployeesListComponent
                            }
                        ]
                    }
                ]
            },
            {
                path: 'me',
                data: { title: 'Мой профиль', showLocked: true },
                component: MyProfileComponent
            },
            {
                path: 'dictionaries',
                component: DictionariesListComponent,
                data: {
                    title: 'Справочники'
                }
            },
            {
                path: 'UsefulLinkCategory',
                component: UsefulLinkCategoryComponent,
                data: {
                    title: 'Полезная ссылка'
                }
            },
            {
                path: 'FileCategory',
                component: FileCategoryComponent,
                data: {
                    title: 'Категория файла'
                }
            },
            {
                path: 'UserLockReason',
                component: UserLockReasonComponent,
                data: {
                    title: 'Причина блокировки пользователя'
                }
            },
            {
                path: 'Position',
                component: PositionComponent,
                data: {
                    title: 'Позиция'
                }
            },
            {
                path: 'EmployeeLockReason',
                component: EmployeeLockReasonComponent,
                data: {
                    title: 'Причина блокировки сотрудника'
                }
            },
            {
                path: 'Nationality',
                component: NationalityComponent,
                data: {
                    title: 'Национальность'
                }
            },
            {
                path: 'NewsCategories',
                component: NewsCategoriesComponent,
                data: {
                    title: 'Категория полезных ссылок'
                }
            },
            {
                path: 'Department',
                component: DepartmentListComponent,
                data: {
                    title: 'Подразделение лист'
                }
            }
        ]
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
