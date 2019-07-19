import { Component, Input } from '@angular/core';

@Component({
    selector: 'floating-fab',
    templateUrl: './floating-fab.component.html',
    styleUrls: ['./floating-fab.component.sass']
})
export class FloatingFabComponent {
    /**
     * Link for Router navigation
     */
    @Input() link = '';

    /**
     * Button title
     */
    @Input() title = 'Добавить';

    /**
     * MatIcon name
     */
    @Input() icon = 'add';
}
