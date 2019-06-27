import { AuthGuard } from './authentication/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AuthComponent } from './authentication/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: { breadcrumb: 'Рабочий стол' },
                children: [
                    {
                        path: 'dashboard',
                        component: DashboardComponent,
                        data: { breadcrumb: 'Рабочий стол 2' }
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
