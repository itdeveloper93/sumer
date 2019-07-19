import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesModule } from './employees/employees.module';
import { RouterModule } from '@angular/router';
import { MyProfileComponent } from './users/my-profile/my-profile.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule, EmployeesModule]
})
export class AdministrationModule {}
