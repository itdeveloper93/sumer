import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GlobalHttpHeadersInterceptorService } from './common/services/http-interceptor.service';
import { LayoutModule } from '@angular/cdk/layout';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './authentication/auth.module';
import { AuthService } from './authentication/auth.service';
import { AdministrationModule } from './administration/administration.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { MiniProfileComponent } from './layout/mini-profile/mini-profile.component';
import { NotificationWidgetComponent } from './layout/notification-widget/notification-widget.component';
import { MainNavigationComponent } from './layout/main-navigation/main-navigation.component';
import { MatPaginatorIntlRus } from './common/paginator-translation';
import { SidenavStateService } from './layout/dashboard-layout/sidenav-state.service';
import { MomentUtcDateAdapter } from './common/MomentUtcDateAdapter';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { SidebarToggleComponent } from './layout/sidebar-toggle/sidebar-toggle.component';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { DictionariesModule } from './dictionaries/dictionaries.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatPaginatorIntl, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { DEFAULT_PERFECT_SCROLLBAR_CONFIG, MAT_DIALOG_GLOBAL_OPTIONS, CUSTOM_MAT_DATE_FORMATS } from './app.config';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        DashboardLayoutComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        MiniProfileComponent,
        NotificationWidgetComponent,
        ImageUploaderComponent,
        MainNavigationComponent,
        ImageUploaderComponent,
        SidebarToggleComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LayoutModule,
        NgMaterialMultilevelMenuModule,
        PerfectScrollbarModule,
        AuthModule,
        AdministrationModule,
        DictionariesModule
    ],
    entryComponents: [],
    providers: [
        JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: JwtInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalHttpHeadersInterceptorService,
            multi: true
        },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: MAT_DIALOG_GLOBAL_OPTIONS
        },
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlRus },
        { provide: DateAdapter, useClass: MomentUtcDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: CUSTOM_MAT_DATE_FORMATS },
        AuthService,
        SidenavStateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
