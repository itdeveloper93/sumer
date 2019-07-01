import { Component, OnInit } from '@angular/core';
import { MiniProfileService } from './mini-profile.service';
import User from './user.interface';

@Component({
    selector: 'mini-profile',
    templateUrl: './mini-profile.component.html',
    styleUrls: ['./mini-profile.component.sass']
})
export class MiniProfileComponent implements OnInit {
    user: User;

    constructor(private miniProfileService: MiniProfileService) {}

    ngOnInit() {
        this.user = this.miniProfileService.getUser();
    }
}
