import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './authentication/auth.module';
import { SignInService } from './authentication/sign-in/sign-in.service';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [AppComponent, DashboardComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule
    ],
    providers: [SignInService],
    bootstrap: [AppComponent]
})
export class AppModule {}
