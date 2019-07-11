/**
 * Angular
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GlobalHttpHeadersInterceptorService } from './global-http-headers-interceptor.service';
import { LayoutModule } from '@angular/cdk/layout';
import {
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';

/**
 * Third party modules/components
 */
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

/**
 * Sumer
 */
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
import {
    MatPaginatorIntl,
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatDialogConfig,
    MatNativeDateModule,
    DateAdapter,
    MAT_DATE_LOCALE,
    MAT_DATE_FORMATS,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule, MatProgressBarModule
} from '@angular/material';
import { MatPaginatorIntlRus } from './paginator';
import { DictionariesListComponent } from './dictionaries/dictionaries-list/dictionaries-list.component';
import {EmployeesModule} from './administration/employees/employees.module';
import { DictionariesFilterComponent } from './dictionaries/dictionaries-filter/dictionaries-filter.component';
import { DepartmentListComponent } from './dictionaries/department-list/department-list.component';
import { SidenavStateService } from './layout/dashboard-layout/sidenav-state.service';
import { MomentUtcDateAdapter } from './MomentUtcDateAdapter';
import { CreateUpdateDepartmentComponent } from './dictionaries/create-update-department/create-update-department.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
};

const MAT_DIALOG_GLOBAL_OPTIONS: MatDialogConfig<any> = {
    maxWidth: '87vw',
    hasBackdrop: true,
    panelClass: 'position-relative'
};

const CUSTOM_DATE_FORMAT = {
    parse: {
        dateInput: 'DD/MM/YYYY'
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'DD',
        monthYearA11yLabel: 'MMMM YYYY'
    }
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
        MainNavigationComponent,
        DictionariesListComponent,
        DictionariesFilterComponent,
        DepartmentListComponent,
        CreateUpdateDepartmentComponent
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
        MatNativeDateModule,
        MatPaginatorModule,
        EmployeesModule,
        MatTableModule,
        MatTooltipModule,
        MatOptionModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatProgressBarModule
    ],
    entryComponents: [
        CreateUpdateDepartmentComponent
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
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: MAT_DIALOG_GLOBAL_OPTIONS
        },
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlRus },
        // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: DateAdapter, useClass: MomentUtcDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT },
        AuthService,
        SidenavStateService
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
