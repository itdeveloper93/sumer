import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingFabComponent } from './floating-fab/floating-fab.component';
import { TableBadgeComponent } from './table-badge/table-badge.component';
import { AlertComponent } from './alert/alert.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material/material.module';

const components = [FloatingFabComponent, TableBadgeComponent, AlertComponent];

@NgModule({
    declarations: components,
    imports: [CommonModule, AppRoutingModule, MaterialModule],
    exports: components
})
export class CommonComponentsModule {}
