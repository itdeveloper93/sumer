import * as moment from 'moment-timezone';

// @ts-ignore
moment.fn.toDateString = function() {
    return this.format('DD.MM.YYYY');
};

/**
 * Parses date from string with given format and Timezone.
 * @param date Date as string
 */
export function momentX(date: string) {
    return moment.utc(date, 'DD.MM.YYYY', 'Asia/Dushanbe').utcOffset(300);
}

/**
 * Here are defined all the global constants to be used
 * anywhere in the app.
 */
export abstract class AppConfig {
    static readonly constants = {
        /**
         * An array of numbers to show on one page.
         */
        PAGE_SIZE_OPTIONS: [20, 50, 100],

        /**
         * Minimum date available to choose from MatDatePicker.
         */
        MIN_DATE: momentX('01.01.1900'),

        /**
         * The minimum age of employee that can be hired.
         */
        ADULT_DATE: moment().subtract(18, 'years')
    };
}
