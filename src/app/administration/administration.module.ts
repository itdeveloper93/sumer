import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyProfileComponent } from './users/my-profile/my-profile.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { FunctionalityAccessPermissionsComponent } from './users/functionality-access-permissions/functionality-access-permissions.component';
import { LockFormComponent } from './lock-form/lock-form.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { CreateEmployeeComponent } from './employees/create-update-employee/create-update-employee.component';
import { UpdatePassportDataComponent } from './employees/update-passport-data/update-passport-data.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeesFilterComponent } from './employees/employees-filter/employees-filter.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { UserComponent } from './users/user/user.component';
import { MaterialModule } from '../material/material.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from '../common/components/common-components.module';

@NgModule({
    declarations: [
        EmployeesListComponent,
        EmployeesFilterComponent,
        EmployeeComponent,
        UserComponent,
        LockFormComponent,
        CreateUserComponent,
        CreateEmployeeComponent,
        UpdatePassportDataComponent,
        MyProfileComponent,
        ChangePasswordComponent,
        FunctionalityAccessPermissionsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        PerfectScrollbarModule,
        ReactiveFormsModule,
        CommonComponentsModule
    ],
    exports: [UserComponent]
})
export class AdministrationModule {}
