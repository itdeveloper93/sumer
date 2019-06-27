import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GlobalHttpHeadersInterceptorService } from './global-http-headers-interceptor.service';
import { AuthModule } from './authentication/auth.module';
import { AuthService } from './authentication/auth.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './material/material.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { MiniProfileComponent } from './layout/mini-profile/mini-profile.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        DashboardLayoutComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        MiniProfileComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalHttpHeadersInterceptorService,
            multi: true
        },
        AuthService
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
