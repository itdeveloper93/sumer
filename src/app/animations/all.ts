import { trigger, transition, style, animate } from '@angular/animations';

/**
 * Fade in/out
 */
export const fade = trigger('fade', [
    transition(':enter', [style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate('200ms', style({ opacity: 0 }))])
]);
