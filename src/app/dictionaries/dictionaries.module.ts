import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionariesListComponent } from './dictionaries-list/dictionaries-list.component';
import { DictionariesFilterComponent } from './dictionaries-filter/dictionaries-filter.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface,
    PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateUpdateDictionariesComponent } from './create-update-dictionaries/create-update-dictionaries.component';
import { SubDictionariesListComponent } from './sub-dictionaries-list/sub-dictionaries-list.component';
import { CommonComponentsModule } from '../common/components/common-components.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
};

const common = [];
@NgModule({
    declarations: [
        DictionariesListComponent,
        DictionariesFilterComponent,
        CreateUpdateDictionariesComponent,
        SubDictionariesListComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        common,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        PerfectScrollbarModule,
        CommonComponentsModule
    ],
    exports: [common],
    entryComponents: [CreateUpdateDictionariesComponent],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class DictionariesModule {}
