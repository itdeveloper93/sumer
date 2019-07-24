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
import { RoutePermissionsGuard } from './authentication/route-permissions-guard.service';

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
                                component: EmployeesListComponent,
                                data: {
                                    title: 'Активные сотрудники',
                                    permissions: ['Employee.All']
                                },
                                canActivate: [RoutePermissionsGuard]
                            },
                            {
                                path: 'locked',
                                component: EmployeesListComponent,
                                data: {
                                    title: 'Заблокированные сотрудники',
                                    permissions: ['Employee.All'],
                                    showLocked: true
                                },
                                canActivate: [RoutePermissionsGuard]
                            },
                            {
                                path: 'create',
                                data: {
                                    title: 'Добавление сотрудника',
                                    permissions: ['Employee.Create']
                                },
                                component: CreateEmployeeComponent,
                                canActivate: [RoutePermissionsGuard]
                            },
                            {
                                path: 'edit',
                                data: { title: 'Редактирование сотрудника', permissions: ['Employee.Edit'] },
                                canActivate: [RoutePermissionsGuard],
                                children: [
                                    {
                                        path: 'essentials/:id',
                                        data: { title: 'Главное' },
                                        component: CreateEmployeeComponent
                                    },
                                    {
                                        path: 'passport-data/:id',
                                        data: {
                                            title: 'Редактирование паспортных данных'
                                        },
                                        component: UpdatePassportDataComponent
                                    }
                                ]
                            },
                            {
                                path: ':id',
                                data: { title: 'Сотрудник', permissions: ['Employee.Details'] },
                                component: EmployeeComponent,
                                canActivate: [RoutePermissionsGuard]
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
                children: [
                    {
                        path: '',
                        data: { title: 'Справочники' },
                        component: DictionariesListComponent
                    },
                    {
                        path: 'useful-link-categories',
                        component: UsefulLinkCategoryComponent,
                        data: {
                            title: 'Полезные ссылки'
                        }
                    },
                    {
                        path: 'file-categories',
                        component: FileCategoryComponent,
                        data: {
                            title: 'Категории файлов'
                        }
                    },
                    {
                        path: 'user-lock-reasons',
                        component: UserLockReasonComponent,
                        data: {
                            title: 'Причины блокировки пользователя'
                        }
                    },
                    {
                        path: 'positions',
                        component: PositionComponent,
                        data: {
                            title: 'Позиции'
                        }
                    },
                    {
                        path: 'employee-lock-reasons',
                        component: EmployeeLockReasonComponent,
                        data: {
                            title: 'Причины блокировки сотрудника'
                        }
                    },
                    {
                        path: 'nationalities',
                        component: NationalityComponent,
                        data: {
                            title: 'Национальности'
                        }
                    },
                    {
                        path: 'news-categories',
                        component: NewsCategoriesComponent,
                        data: {
                            title: 'Категории полезных ссылок'
                        }
                    },
                    {
                        path: 'departments',
                        component: DepartmentListComponent,
                        data: {
                            title: 'Список подразделений'
                        }
                    }
                ]
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
