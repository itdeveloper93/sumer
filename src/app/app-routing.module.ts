import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AuthComponent } from './authentication/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'auth',
    //     pathMatch: 'full'
    // },
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
