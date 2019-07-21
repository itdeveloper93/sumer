import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUpdateDepartmentComponent } from './department-list/create-update-department/create-update-department.component';
import { CreateUpdateUsefulLinkCategoryComponent } from './useful-link-category/create-update-useful-link-category/create-update-useful-link-category.component';
import { CreateUpdateFileCategoryComponent } from './file-category/create-update-file-category/create-update-file-category.component';
import { CreateUpdateUserLockReasonComponent } from './user-lock-reason/create-update-user-lock-reason/create-update-user-lock-reason.component';
import { CreateUpdateEmployeeLockReasonComponent } from './employee-lock-reason/create-update-employee-lock-reason/create-update-employee-lock-reason.component';
import { CreateUpdatePositionComponent } from './position/create-update-position/create-update-position.component';
import { CreateUpdateNationalityComponent } from './nationality/create-update-nationality/create-update-nationality.component';
import { CreateUpdateNewsCategoriesComponent } from './news-categories/create-update-news-categories/create-update-news-categories.component';
import { DictionariesListComponent } from './dictionaries-list/dictionaries-list.component';
import { DictionariesFilterComponent } from './dictionaries-filter/dictionaries-filter.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { UsefulLinkCategoryComponent } from './useful-link-category/useful-link-category.component';
import { FileCategoryComponent } from './file-category/file-category.component';
import { PositionComponent } from './position/position.component';
import { UserLockReasonComponent } from './user-lock-reason/user-lock-reason.component';
import { EmployeeLockReasonComponent } from './employee-lock-reason/employee-lock-reason.component';
import { NationalityComponent } from './nationality/nationality.component';
import { NewsCategoriesComponent } from './news-categories/news-categories.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface,
    PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { AdministrationModule } from '../administration/administration.module';
import { EmployeesModule } from '../administration/employees/employees.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
};

const common = [];
@NgModule({
    declarations: [
        DictionariesListComponent,
        DictionariesFilterComponent,
        DepartmentListComponent,
        CreateUpdateDepartmentComponent,
        UsefulLinkCategoryComponent,
        FileCategoryComponent,
        UserLockReasonComponent,
        PositionComponent,
        EmployeeLockReasonComponent,
        NationalityComponent,
        NewsCategoriesComponent,
        CreateUpdateUsefulLinkCategoryComponent,
        CreateUpdateFileCategoryComponent,
        CreateUpdateUserLockReasonComponent,
        CreateUpdatePositionComponent,
        CreateUpdateEmployeeLockReasonComponent,
        CreateUpdateNationalityComponent,
        CreateUpdateNewsCategoriesComponent
    ],
    imports: [
        CommonModule,
        common,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        PerfectScrollbarModule,
        AdministrationModule,
        EmployeesModule
    ],
    exports: [common],
    entryComponents: [
        CreateUpdateDepartmentComponent,
        CreateUpdateUsefulLinkCategoryComponent,
        CreateUpdateFileCategoryComponent,
        CreateUpdateUserLockReasonComponent,
        CreateUpdatePositionComponent,
        CreateUpdateEmployeeLockReasonComponent,
        CreateUpdateNationalityComponent,
        CreateUpdateNewsCategoriesComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class DictionariesModule {}