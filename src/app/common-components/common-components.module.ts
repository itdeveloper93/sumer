import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingFabComponent } from './floating-fab/floating-fab.component';
import { TableBadgeComponent } from './table-badge/table-badge.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';

const components = [FloatingFabComponent, TableBadgeComponent];

@NgModule({
    declarations: components,
    imports: [CommonModule, AppRoutingModule, MaterialModule],
    exports: components
})
export class CommonComponentsModule {}
