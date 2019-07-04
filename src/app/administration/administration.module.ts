import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesModule } from './employees/employees.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule, EmployeesModule]
})
export class AdministrationModule {}
