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
    MatCheckboxModule,
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
    MatRadioModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TableBadgeComponent } from 'src/app/table-badge/table-badge.component';
import { EmployeesFilterComponent } from './employees-filter/employees-filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FloatingFabComponent } from 'src/app/floating-fab/floating-fab.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component';
import { LockDialogComponent } from './employee/lock-dialog/lock-dialog.component';
import { UserComponent } from '../users/user/user.component';
import { LockFormComponent } from '../lock-form/lock-form.component';
import { AlertComponent } from 'src/app/alert/alert.component';
import { CreateUserComponent } from '../users/create-user/create-user.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { CreateUpdatePassportDataComponent } from './create-update-passport-data/create-update-passport-data.component';

@NgModule({
    declarations: [
        EmployeesListComponent,
        TableBadgeComponent,
        EmployeesFilterComponent,
        FloatingFabComponent,
        EmployeeComponent,
        LoadingIndicatorComponent,
        LockDialogComponent,
        UserComponent,
        LockFormComponent,
        AlertComponent,
        CreateUserComponent,
        CreateEmployeeComponent,
        CreateUpdatePassportDataComponent
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
        MatCheckboxModule,
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
        MatRadioModule
    ],
    exports: [UserComponent],
    entryComponents: [LockDialogComponent]
})
export class EmployeesModule {}
