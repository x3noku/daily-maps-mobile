export default interface IUser {
    id: string | undefined,

    type?: UserType,

    login: string,

    username: string | undefined,
};

export enum UserType {
    person = 'person',
    company = 'company'
}
