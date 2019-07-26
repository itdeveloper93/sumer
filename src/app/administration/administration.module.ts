import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyProfileComponent } from './users/my-profile/my-profile.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { FunctionalityAccessPermissionsComponent } from './users/functionality-access-permissions/functionality-access-permissions.component';
import { LockFormComponent } from './lock-form/lock-form.component';
import { AlertComponent } from 'src/app/alert/alert.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { UpdatePassportDataComponent } from './employees/update-passport-data/update-passport-data.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { LoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component';
import { EmployeesFilterComponent } from './employees/employees-filter/employees-filter.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { TableBadgeComponent } from '../table-badge/table-badge.component';
import { FloatingFabComponent } from '../floating-fab/floating-fab.component';
import { UserComponent } from './users/user/user.component';
import { MaterialModule } from '../material/material.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        EmployeesListComponent,
        TableBadgeComponent,
        EmployeesFilterComponent,
        FloatingFabComponent,
        EmployeeComponent,
        LoadingIndicatorComponent,
        UserComponent,
        LockFormComponent,
        AlertComponent,
        CreateUserComponent,
        CreateEmployeeComponent,
        UpdatePassportDataComponent,
        MyProfileComponent,
        ChangePasswordComponent,
        FunctionalityAccessPermissionsComponent
    ],
    imports: [CommonModule, RouterModule, MaterialModule, PerfectScrollbarModule, ReactiveFormsModule],
    exports: [UserComponent, TableBadgeComponent, FloatingFabComponent]
})
export class AdministrationModule {}
