import { AuthService } from '../authentication/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
    constructor(public authService: AuthService) {}
}
