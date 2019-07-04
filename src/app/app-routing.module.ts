import { AuthGuard } from './authentication/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AuthComponent } from './authentication/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { EmployeesListComponent } from './administration/employees/employees-list/employees-list.component';
import { EmployeeComponent } from './administration/employees/employee/employee.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        canActivate: [AuthGuard],
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
