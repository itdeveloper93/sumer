import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.sass']
})
export class ImageUploaderComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    /**
     * Renders image to given img tag
     * @param file File object
     * @param canvas CSS selector of the element where the image should be rendered
     */
    static renderImagePreview(files: FileList, canvas: string = '.photo-preview') {
        const reader = new FileReader();

        reader.onload = (event: any) => {
            document.querySelector(canvas).setAttribute('src', event.target.result);
        };

        reader.readAsDataURL(files[0]);
    }
}
