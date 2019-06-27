import { Injectable } from '@angular/core';
import User from './user.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MiniProfileService {
    constructor() {}

    getUser(): User {
        return {
            id: 'd23e-w3wf-sdvb-324d',
            avatarUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
            fullName: 'Кодир Мирзоев',
            position: 'Генеральный директор'
        };
    }
}
