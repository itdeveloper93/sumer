import * as moment from 'moment-timezone';

/**
 * Initiates download of the given blob as file
 * @param disposition Content-disposition header value
 * @param blob Blob
 */
export function downloadFileFromBlob(disposition: string, blob: Blob) {
    const fileName = decodeURIComponent(disposition.split('filename*=')[1].split(`''`)[1]);
    const fileUrl = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.download = decodeURIComponent(fileName);
    anchor.href = fileUrl;
    anchor.click();
}

/**
 * Parses date from string with given format and Timezone.
 * @param date Date as string
 */
export function momentX(date: string) {
    return moment.utc(date, 'DD.MM.YYYY', 'Asia/Dushanbe').utcOffset(300);
}
