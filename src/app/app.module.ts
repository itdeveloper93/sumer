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
import { LayoutModule } from '@angular/cdk/layout';
import { NotificationWidgetComponent } from './layout/notification-widget/notification-widget.component';
import { MainNavigationComponent } from './layout/main-navigation/main-navigation.component';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
};

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        DashboardLayoutComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        MiniProfileComponent,
        NotificationWidgetComponent,
        MainNavigationComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        HttpClientModule,
        LayoutModule,
        NgMaterialMultilevelMenuModule,
        PerfectScrollbarModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalHttpHeadersInterceptorService,
            multi: true
        },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        AuthService
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
