import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatRippleModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    MatOptionModule,
    MatTooltipModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatProgressBarModule,
    DateAdapter,
    MatSortModule
} from '@angular/material';

const modules = [
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatRippleModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSortModule
];

@NgModule({
    declarations: [],
    imports: [CommonModule, modules],
    providers: [],
    exports: [modules]
})
export class MaterialModule {}
