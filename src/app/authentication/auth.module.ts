import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [AuthComponent, SignInComponent, ResetPasswordComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem('access_token'),
                whitelistedDomains: environment.JWT.whitelistedDomains,
                blacklistedRoutes: environment.JWT.blacklistedRoutes
            }
        })
    ],
    exports: [AuthComponent, SignInComponent]
})
export class AuthModule {}
