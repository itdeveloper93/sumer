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
    MatSnackBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TableBadgeComponent } from 'src/app/table-badge/table-badge.component';
import { EmployeesFilterComponent } from './employees-filter/employees-filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FloatingFabComponent } from 'src/app/floating-fab/floating-fab.component';
import { EmployeeComponent, EmployeeLockDialogComponent } from './employee/employee.component';
import { LoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component';
import { LockDialogComponent } from './employee/lock-dialog/lock-dialog.component';

@NgModule({
    declarations: [
        EmployeesListComponent,
        TableBadgeComponent,
        EmployeesFilterComponent,
        FloatingFabComponent,
        EmployeeComponent,
        LoadingIndicatorComponent,
        LockDialogComponent
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
        MatSnackBarModule
    ],
    entryComponents: [LockDialogComponent]
})
export class EmployeesModule {}
