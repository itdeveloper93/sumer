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
import { CreateUpdatePassportDataComponent } from './administration/employees/create-update-passport-data/create-update-passport-data.component';

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
                                        component: CreateUpdatePassportDataComponent
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
