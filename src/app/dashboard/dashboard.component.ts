import { HttpClient } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
    constructor(public authService: AuthService, private http: HttpClient) {}

    /**
     * Test GET request
     */
    getUserList() {
        return this.http
            .get(environment.API.URL + 'Account/UserAll')
            .subscribe(response => {
                console.log(response);
            });
    }
}
