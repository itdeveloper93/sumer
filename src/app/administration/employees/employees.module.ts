import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import {
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSortModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TableBadgeComponent } from 'src/app/table-badge/table-badge.component';
import { EmployeesFilterComponent } from './employees-filter/employees-filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FloatingFabComponent } from 'src/app/floating-fab/floating-fab.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component';
import { UserComponent } from '../users/user/user.component';
import { LockFormComponent } from '../lock-form/lock-form.component';
import { AlertComponent } from 'src/app/alert/alert.component';
import { CreateUserComponent } from '../users/create-user/create-user.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdatePassportDataComponent } from './update-passport-data/update-passport-data.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MyProfileComponent } from '../users/my-profile/my-profile.component';
import { ChangePasswordComponent } from '../users/change-password/change-password.component';
import { FunctionalityAccessPermissionsComponent } from '../users/functionality-access-permissions/functionality-access-permissions.component';

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
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatMenuModule,
        MatCardModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatDividerModule,
        MatListModule,
        MatProgressBarModule,
        MatDialogModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatRadioModule,
        PerfectScrollbarModule,
        MatSortModule
    ],
    exports: [UserComponent, FloatingFabComponent, TableBadgeComponent]
})
export class EmployeesModule {}
