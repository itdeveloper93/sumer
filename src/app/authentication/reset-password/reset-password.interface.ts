export interface ResetPasswordCredentials {
    phoneNumber: number;
}

interface Error {
    description: string;
}

interface Meta {
    success: boolean;
    errors: Error[];
}

export default interface ResetPasswordResponseInterface {
    meta: Meta;
    data: string;
}
