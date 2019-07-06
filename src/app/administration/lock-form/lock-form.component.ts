import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LockService, LockReason } from './lock.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'lock-form',
    templateUrl: './lock-form.component.html',
    styleUrls: ['./lock-form.component.sass']
})
export class LockFormComponent implements OnInit {
    isRequesting: boolean;
    lockReasons: LockReason[];

    @Input() entityType: string;
    @Input() id: string;
    @Input() horisontal: string;

    @Output() onError = new EventEmitter<boolean>();

    /**
     * Register form and it's controls
     */
    form = new FormGroup({
        lockReason: new FormControl({ value: '', disabled: true })
    });

    constructor(private service: LockService, private snackbar: MatSnackBar) {}

    ngOnInit() {
        this.getLockReasons();
    }

    /**
     * Get lock reasons
     */
    getLockReasons() {
        this.isRequesting = true;

        return this.service.getLockReasons(this.entityType).subscribe(
            response => {
                this.lockReasons = response.data;
                this.form.enable();
            },
            (error: Response) => {
                switch (error.status) {
                    case 0:
                        this.snackbar.open(
                            'Ошибка. Проверьте подключение к Интернету или настройки Firewall.'
                        );
                        break;

                    default:
                        this.snackbar.open(`Ошибка ${error.status}. Обратитесь к администратору`);
                        break;
                }

                this.onError.emit(true);
                this.isRequesting = false;
                this.form.enable();
            },
            () => (this.isRequesting = false)
        );
    }

    /**
     * Lock entity
     * @param id ID
     * @param lockReasonId Lock reason ID
     */
    lock(id: string, lockReasonId: string) {
        this.service.lock(this.entityType, id, lockReasonId);
    }
}
