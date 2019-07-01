export interface SignInCredentials {
    phoneNumber: number;
    password: string;
}

interface Error {
    description: string;
}

interface Meta {
    success: boolean;
    errors: Error[];
}

interface Data {
    token: string;
}

export default interface SignInResponseInterface {
    meta: Meta;
    data: Data;
}
