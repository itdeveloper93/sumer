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
    MatSortModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSliderModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatExpansionModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatChipsModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const modules = [
    BrowserModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
];

@NgModule({
    declarations: [],
    imports: [CommonModule, modules],
    providers: [],
    exports: [modules]
})
export class MaterialModule {}
