import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressSpinnerModule
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
    MatInputModule,
    MatProgressSpinnerModule
];

@NgModule({
    declarations: [AuthComponent, SignInComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        materialModules,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem('access_token'),
                whitelistedDomains: ['192.168.88.246:4200'],
                blacklistedRoutes: ['192.168.88.246:4200/auth']
            }
        })
    ],
    exports: [AuthComponent, SignInComponent]
})
export class AuthModule {}
