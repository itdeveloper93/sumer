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
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
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
    MatProgressBarModule
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
    MatProgressBarModule
];

@NgModule({
    declarations: [],
    imports: [CommonModule, modules],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 5000, panelClass: 'text-center' }
        }
    ],
    exports: [modules]
})
export class MaterialModule {}
