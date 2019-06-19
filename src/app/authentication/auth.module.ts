import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule
} from '@angular/material';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';

const materialModules = [
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule
];

@NgModule({
    declarations: [AuthComponent, SignInComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        materialModules,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [AuthComponent, SignInComponent]
})
export class AuthModule {}
