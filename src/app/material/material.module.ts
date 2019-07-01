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
    MatRippleModule
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
    MatRippleModule
];

@NgModule({
    declarations: [],
    imports: [CommonModule, modules],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 5000 }
        }
    ],
    exports: [modules]
})
export class MaterialModule {}
