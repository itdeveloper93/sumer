/**
 * The shape of all responses coming from the API
 */
export default interface BaseResponseInterface<T> {
    meta: Meta;
    data: T;
}

/**
 * Response meta information
 */
interface Meta {
    success: boolean;
    statusCode: number;
    errors: Error[];
}

/**
 * Meta error shape
 */
interface Error {
    description: string;
}
